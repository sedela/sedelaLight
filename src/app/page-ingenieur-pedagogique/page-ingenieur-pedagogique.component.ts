import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SedelaModelService } from '../service/sedela-model.service';
import { AuthService } from '../service/auth/auth.service';
import { QuillDeltaToHtmlConverter } from '../quill-delta-to-html/src/QuillDeltaToHtmlConverter';
import { NotificationService } from '../service/notifications/notification.service';

import { interval, Subscription } from 'rxjs';
import { User } from '../model/user.model';





export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-page-ingenieur-pedagogique',
  templateUrl: './page-ingenieur-pedagogique.component.html',
  styleUrls: ['./page-ingenieur-pedagogique.component.css']
})
export class PageIngenieurPedagogiqueComponent implements OnInit {

   
  editor_style = {
    height: '800px',
    width: '800px'
  }

  toolbarOptions = {
    toolbar: []
  }

  list_of_student_contacts: any = [];
  list_of_shared_documents: any = [];
  contactForm: FormGroup;
  itemListGroup: FormGroup;
  htmls: any = '';
  text_default = 'affichage document...';
  isReadOnly = true;
  list_of_comments = [];
  background_color = '#fff';
  document_opened: any;
  who_is_connected: any;
  //Alimente l'application tous les x secondes
  subscription: Subscription;
  


  constructor(private authService: AuthService,
     private sedela_service: SedelaModelService,
     private notification: NotificationService) { }


  //

  ngOnInit() {

    this.contactForm = new FormGroup({
      contactsControl: new FormControl('', [Validators.required])
    });

    this.itemListGroup = new FormGroup({
      itemListControl: new FormControl('', [Validators.required])
    });
    
    this.who_is_connected = this.getUserConnected();
    const source = interval(1000);
    this.subscription = source.subscribe(() =>
    this.sedela_service.getUserById('doc_'+this.who_is_connected).then((user: User) => {
      this.list_of_student_contacts = user.list_of_contacts;
  
      //console.log(this.list_of_student_contacts);
    })
    )

    
    console.log(this.getUserConnected());
    

   
  

  }



  getUserConnected() {
    return this.authService.getUser().email;
  }

  getListDocumentShared() {
    this.list_of_shared_documents = [];
    this.list_of_comments =[];
    let student_email = this.contactForm.get('contactsControl').value;
    console.log('student',student_email);
    let index = this.list_of_student_contacts.findIndex(user => user.contact_id === student_email);
    let list_of_document_name = this.list_of_student_contacts[index].list_of_sharing_documents;
     console.log('list of documents name',list_of_document_name);
    if (list_of_document_name && list_of_document_name.length > 0) {
      //get all documents written by student_email and select only shared document
      this.sedela_service.getUserById('doc_'+student_email).then((user: User) => {
        let all_documents = user.list_of_documents;
        for (let i = 0; i < list_of_document_name.length; i++) {
          let document_name = list_of_document_name[i];
          let document = this.sedela_service.getDocumentByID(document_name, all_documents);      //console.log('document', document[0]);
          //console.log('getdocument by id:', document);
          this.list_of_shared_documents[i] = document[0];
        }

       // console.log('this.list_of_shared_documents:', this.list_of_shared_documents);
        //console.log('list of contact',this.list_of_student_contacts);
      });
    }
    else{
      this.notification.showInfo('pas de document pargé avec cet étudiant');
    }
   
  }

  getClick(vals) {
    //console.log('click', this.contactForm.get('contactsControl').value.sharing);
    //console.log('click', this.itemListGroup.get('itemListControl').value);
    console.log('click', vals);
  }

  openDocument(document) {
    this.background_color = '#558';
    this.document_opened = document;
    let qdc = new QuillDeltaToHtmlConverter(document.document_content,
      { classPrefix: 'noz' });
    //console.log('delta: ', this.delta);
    this.htmls = qdc.convert();
    this.list_of_comments = document.document_comments;
    // console.log('document opened',this.document_opened);

  }

  myPostChange(event: any) {

    this.list_of_comments.push(event);
    this.list_of_comments =this.sedela_service.sortPostsBylastDateCreated(this.list_of_comments);
    let student_email = this.contactForm.get('contactsControl').value;
    if(student_email && this.document_opened){
      this.sedela_service.getUserById('doc_'+student_email).then((user: User) => {
        let index = user.list_of_documents.findIndex(docs => docs.document_name === this.document_opened.document_name);
        user.list_of_documents[index].document_comments = this.list_of_comments;
        this.sedela_service.createDocument(user).then(function () {
          console.log('document crée par l enseignant');
        });
  
      });
      this.notification.showSuccess('commentaire enregistré');

    }
    else{
      this.notification.showError("Verifier que vous avez sélectionner un étudiant et le document que vous voulez commenter.");
    }
    

  }



}
