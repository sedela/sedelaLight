//mport { Component, OnInit } from '@angular/core';
//

import { Component, OnInit, Injectable, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Validators, FormControl, FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import { DataService } from '../appmodel.service';
import { QuillDeltaToHtmlConverter } from '../quill-delta-to-html/src/QuillDeltaToHtmlConverter';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Document } from '../model/document';
import { SedelaModelService } from '../service/sedela-model.service';
import { AuthService } from '../service/auth/auth.service';
import { User } from '../model/user.model';
import { NotificationService } from '../service/notifications/notification.service';

import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-page-etudiant',
  templateUrl: './page-etudiant.component.html',
  styleUrls: ['./page-etudiant.component.css']
})
export class PageEtudiantComponent implements OnInit {

  // compteur: any;
  // @Input()  post: any;
  delta_initiale = [
    {
      "insert": "\n"
    }
  ];
  listPosts: any[] = []; // ListPosts;
  panelOpenState: boolean = false;
  @Input() myToken: any = 2;
  @Input() data: any = {};
  @Input() myDomain: any = 3;
  user_info_needed: User;
  documentname: string;
  //@Output() listeDocumentChange = new EventEmitter();
  documents: any = {};
  htmls = '';
  isReadOnly = false;
  // @Output() deltaChange = new EventEmitter();
  delta: any;
  docDelta;
  listedocument: any = []; //Document [] = [];
  list_of_contacts: any = [];
  documentForm: FormGroup;
  selected = ' ';

  downloadJsonHref: SafeUrl;
  resJsonResponse: any;
  touslesdocuments: any;
  contacts = {};
  subscription: Subscription;
  who_is_connected: any;

  constructor(
    private sedela_service: SedelaModelService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private notification: NotificationService
  ) { }
  // constructor(public http: HttpClient, ) {}
  ngOnInit(): void { // adding the lifecycle hook ngOnInit
    this.who_is_connected = this.getUserConnected();
    this.documentForm = new FormGroup({
      documentsControl: new FormControl('', [Validators.required]),
      contactControl: new FormControl('', [Validators.required])
    });
    const source = interval(1000);
    this.subscription = source.subscribe(() =>
      this.sedela_service.getUserById('doc_' + this.who_is_connected).then((user: User) => {
        this.user_info_needed = user;
        this.listedocument = this.user_info_needed.list_of_documents;
        this.list_of_contacts = this.user_info_needed.list_of_contacts;
        //console.log('user connected informations:', this.user_info_needed.list_of_contacts[0]);
      })
    )



  }

  getUserConnected() {
    return this.authService.getUser().email;
  }



  // tri décroisssant
  public descendingSort(list_of_document) {
    return this.sedela_service.sortBylastDateModified(list_of_document);

  }

  addDocument(document_name) {
    //this.listedocument =  [...this.listedocument ,documents];
    this.listedocument.push(document_name);
  }

  public shareDocument() {
    let teacher_email = this.documentForm.get('contactControl').value;
    let student_email = this.getUserConnected();
    let document_name = this.documentForm.get('documentsControl').value;
    if (!teacher_email && !document_name) {
      this.notification.showError("verifez que vous selectioné un contact et un document avant de partager");
    }
    else if (!teacher_email) {
      this.notification.showError(" vous n'avez pas sélectionné le contact");
    }
    else if (!document_name) {
      this.notification.showError(" vousn n'avez pas selectionné un document");
    }
    else {
      try {
        this.sedela_service.getUserById('doc_' + teacher_email).then((user: User) => {
          let list_of_shared_document: any = user.list_of_contacts.filter(contact => contact.contact_id === student_email)[0].list_of_sharing_documents;
          if (list_of_shared_document.includes(document_name)) {
            this.notification.showError(" le document déja partagé");
          }
          else {
            this.sedela_service.shareDocumentWithTeacher(document_name, student_email, teacher_email);
            this.notification.showSuccess('document était déja partagé avec la personne');
          }
        });
      } catch (error) {
        this.notification.showSuccess(error);
      }

    }


  }


  getHtmlFromDeltaWithPram() {
    let docs = this.documentForm.get('documentsControl').value;

    if (docs && this.listedocument) {
        // console.log('documentliste', this.listedocument);
    this.documents = this.sedela_service.getDocumentByID(docs, this.listedocument);
    //console.log('document selectionné', this.documents);
    let qdc = new QuillDeltaToHtmlConverter(this.documents[0].document_content,
      { classPrefix: 'noz' });
    this.delta = qdc;
    //console.log('delta: ', this.delta);
    this.htmls = qdc.convert();
    this.listPosts = this.documents[0].document_comments;
    }
    
    
  

  }

  clearEditor() {
    var element = document.getElementsByClassName("ql-editor");
    element[0].innerHTML = " ";
   //this.selected = '';
    this.documentForm.get('documentsControl').setValue('');
    

  }

  NewDocumentClearEditor() {
    this.listPosts = [];
    var element = document.getElementsByClassName("ql-editor");
    element[0].innerHTML = " ";
    this.documentForm.get('documentsControl').setValue('');
  
    

  }


  saveDocument() {

    let document_name = this.documentForm.get('documentsControl').value;
    if (document_name && this.listedocument && this.listedocument.length > 0) {
      this.delta = this.delta;
      let document_content = this.delta['ops'];
     //console.log('document content',document_content);

      this.listedocument = this.sedela_service.updateDocument(document_name, document_content, this.listPosts, this.listedocument);
      this.user_info_needed.list_of_documents = this.listedocument;
     // console.log('this.listedpocument:', this.listedocument);
     // console.log('this.info.user.need:', this.user_info_needed);
      this.sedela_service.getUserById(this.user_info_needed._id).then((usr: User) => {
        this.user_info_needed._rev = usr._rev;
        this.sedela_service.createDocument(this.user_info_needed).then(() => {
          console.log('document mis à jour');
          this.notification.showSuccess('document modifié avec succé');
         
        });
     

      });

    }
    else {
      this.openDialog();
    }


  }

  getDeltaOps(document_name: string) {

    let document = new Document();
    document.document_content = this.delta['ops'];
    document.document_name = document_name;
    document.document_version = document_name + "_" + document.last_date_modified;
    if (this.documentForm.get('documentsControl').value === '') {
      document.document_parent = document_name;
    }
    else {
      document.document_parent = this.documentForm.get('documentsControl').value;
    }

    document.document_comments = [];
    document.date_created = new Date();
    this.user_info_needed.list_of_documents.push(document);
    this.documentForm.get('documentsControl').patchValue(document_name);
    //this.listedocument.push(document);
    this.sedela_service.getUserById(this.user_info_needed._id).then(usr => {
      this.user_info_needed._rev = usr._rev;

      this.sedela_service.createDocument(this.user_info_needed).then(()=> {
        console.log('document crée');
        this.notification.showSuccess('document créé.');
       
      });
      
    });

  }


  // Supprimé le  document dans la bas des contacts 
  public deleteDocumentOnContactswithShared(document_name) {
    // let list_of_shared_contact = usr.list_of_contacts;
    //console.log('list_of_contact:', list_of_shared_contact);
    //let usr = this.user_info_needed;

    if (this.user_info_needed.list_of_contacts.length > 0) {
    //  console.log('list_of_shared_contact:', this.user_info_needed.list_of_contacts);
      let teacher_email = this.user_info_needed.list_of_contacts[0].contact_id;
     // console.log('student list of contact', this.user_info_needed.list_of_contacts[0]);

      this.sedela_service.getUserById('doc_' + teacher_email).then((teacher: User) => {
        let list_of_shared_contact = teacher.list_of_contacts;
      //  console.log('list_of_contacts avant supression:', teacher.list_of_contacts);
        for (let contact of list_of_shared_contact) {
          let list_of_sharing_documents = contact.list_of_sharing_documents
          console.log("contact ", list_of_sharing_documents);
          for (let k = 0; k < list_of_sharing_documents.length; k++) {
            //console.log(k +' '+list_of_sharing_documents[k]);
            if (list_of_sharing_documents[k] === document_name) {
              console.log('document trouvé à la postion:', k);
              //let temp_list_of_sharing_documents = list_of_sharing_documents;
              let temp_list_of_sharing_documents = list_of_sharing_documents.filter(doc => doc != document_name);
              let temp_contact = contact.contact_id;
              teacher.list_of_contacts = teacher.list_of_contacts.filter(item => item.contact_id != contact.contact_id);
              let contact_change = {
                contact_id: temp_contact,
                list_of_sharing_documents: temp_list_of_sharing_documents
              }
              if (teacher.list_of_contacts.length > 0) {
                teacher.list_of_contacts.push(contact_change);
              }
              else {
                teacher.list_of_contacts[0] = contact_change;
              }
              this.sedela_service.createDocument(teacher).then(() => {
                this.notification.showSuccess('document partagé supprimé')
              }).catch((error) => {
                this.notification.showError(error);
              })
              //console.log('contact_change', teacher);
            }
          }
        }

      });

    }

  }

  // suprresion du document dans la base du propietaire du document
  deleteDocumentonForOwn(document_name) {

    this.sedela_service.getUserById(this.user_info_needed._id).then(usr => {
      this.user_info_needed._rev = usr._rev;
      this.user_info_needed.list_of_documents = this.sedela_service.deleteDocument(document_name, this.user_info_needed.list_of_documents);

      this.sedela_service.createDocument(this.user_info_needed).then(() => {});

    });
    this.listPosts = [];
    this.clearEditor();


  }

  deleteDocument() {
    let document_name = this.documentForm.get('documentsControl').value;
    console.log('document name passé en argument:', document_name);
    if (document_name) {
      if (this.user_info_needed.list_of_contacts.length > 0) {
        this.deleteDocumentOnContactswithShared(document_name);
      }

      this.deleteDocumentonForOwn(document_name);
      

    }
    else {
      this.clearEditor();

    }


  }


  myValueChange(event) {
    this.htmls = event.value;
  }

  myDeltaChange(event) {
    //console.log('event delta:', event.value);
    this.delta = event.value;
    //console.log('delta', this.delta);
  }

  AfficherHTML() {
    console.log('HTML: ' + this.htmls);
  }

  myPostChange(event: any) {
    //console.log('this  event forum: ', event);
    this.listPosts.push(event);
    this.listPosts = this.sedela_service.sortPostsBylastDateCreated(this.listPosts);
    let student_email = this.getUserConnected();
    let document_opened = this.documentForm.get('documentsControl').value;
    if (document_opened) {
      this.sedela_service.getUserById('doc_' + student_email).then((user: User) => {
        let index = user.list_of_documents.findIndex(docs => docs.document_name === document_opened);
        user.list_of_documents[index].document_comments = this.listPosts;
        this.sedela_service.createDocument(user).then(function () {
          console.log('document crée par l enseignant');
        });
      });

      this.notification.showSuccess('commentaire enregistré');
    }
    else {
      this.notification.showWarning(" Vous essayez d'ajouter un commentaire qui n'est lié à aucun document. Pour le sauvegarder cliquer sur Enregistrer/ Enregistrer sous.");
    }



  }

 

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;

    dialogConfig.position = {
      'top': '0',
      'left': '0'
    };
    dialogConfig.data = {
      documentname: this.documentname
    };

    //this.dialog.open(DialogOverviewExampleDialog, dialogConfig);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        if (data) {
          this.getDeltaOps(data);
        }


      });

  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../dialog.html',
})
export class DialogOverviewExampleDialog {


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  close() {
    this.dialogRef.close();
  }

  save() {
    //this.dialogRef.close(this.form.controls['documentname'].value);
    //console.log('this.form.value',this.form.controls['documentname'].value);
    //this.dialogRef.close();
    /** this.dialogRef.close(this.form.value);
     console.log('this.form.value',this.form.value)*/
  }

}



