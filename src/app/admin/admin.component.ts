import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../service/user/user.service';
import { SedelaModelService } from '../service/sedela-model.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Contacts, User } from '../model/user.model';
import { CdkObserveContent } from '@angular/cdk/observers';
import { ContactService } from '../service/contact/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../service/notifications/notification.service';

//import 'rxjs/add/observable/interval';


import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  list_of_users = [];
  list_of_students = [];
  list_of_teachers = []
  list_of_affectations = [];
  
  teacherGroup: FormGroup;
  studentGroup: FormGroup;
  subscription: Subscription;


  constructor(private sedelaservice: SedelaModelService,
    private notification: NotificationService) {
    
  }

  ngOnInit() {

    this.teacherGroup = new FormGroup({
      teacherControl: new FormControl('', [Validators.required]),
      studentControl: new FormControl('', [Validators.required])
    });

    
   

    const source = interval(1000);
    this.subscription = source.subscribe(() =>
      this.sedelaservice.getAllUsers().then(resultat => {
        this.list_of_users = resultat.filter(res => res.role != 'gestionnaire');
        this.list_of_teachers = resultat.filter(res => res.role === 'Enseignant');
        this.list_of_affectations =  resultat.filter(res => res.role === 'Etudiant' && res.list_of_contacts.length>0);
        let all_of_students = resultat.filter(res => res.role === 'Etudiant');
       this.list_of_students = all_of_students.filter(item => !this.list_of_affectations.includes(item));
       
        //console.log('mes users:', this.mesusers);
      }));

  }

  onAssociate() {
    //console.log('liste des affectations:', this.list_of_affectations);
    //console.log('etudiant selectionné:',this.teacherGroup.get('teacherControl').value);
    let teacher_id = this.teacherGroup.get('teacherControl').value;
    let student_email = this.teacherGroup.get('studentControl').value;
    if (student_email && teacher_id) {
      //ajouter l'id de l'enseignant dans la liste de contact de ses etudiants
      let tearcher_to_link: any;
      //add student to  list contact of teacher
      this.sedelaservice.getUserById('doc_'+teacher_id).then(res => {
        tearcher_to_link = res;
          let student_to_contact: any = {};
          student_to_contact.contact_id = student_email;
          student_to_contact.list_of_sharing_documents = [];
          tearcher_to_link.list_of_contacts.push(student_to_contact);
          this.sedelaservice.createDocument(tearcher_to_link).then(() => {});
          this.sedelaservice.getUserById('doc_' + student_email).then((student_data: User) => {
            // console.log('student_data', student_data);
            let teacher_to_contact: any = {};
            teacher_to_contact.contact_id = teacher_id;
            teacher_to_contact.list_of_sharing_documents = [];
            student_data.list_of_contacts.push(teacher_to_contact);
            this.sedelaservice.createDocument(student_data).then(() => {});
    
          });

          let msg = student_email + 'et'+ ' ' + teacher_id + 'sont maintenant en contact';
          this.notification.showSuccess(msg);

      });

      //add teacher to list contact of student

      

     

    }
    else {
      this.notification.showError('vous n avez pas choisi d etudiant ou verifier que vous avez selectionné un enseignant');
      console.log('vous n avez pas choisi d etudiant ou verifier que vous avez selectionné un enseignant');
    }


  }


}
