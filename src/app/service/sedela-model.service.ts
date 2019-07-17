import { Injectable, OnInit } from '@angular/core';
import { User, NewUser } from 'src/app/model/user.model';
import { Document } from '../model/document';
import PouchDB from 'pouchdb';
//import { ServiceAuthDbAdmin } from 'src/environments/environment';
import { ServiceAuthDbAdmin } from 'src/app/config';

//PouchDB.plugin(PouchDBAuthentication);

@Injectable({
  providedIn: 'root'
})


export class SedelaModelService {

  private apiURL: string = 'http://localhost:5984';
  private db_name: string = 'sedeladb';
  private db: any = new PouchDB(this.apiURL + '/' + this.db_name);
   
  //url_remote = 'https://sedela.enstb.org/dba/sedeladb';
  /*apiURL: string =  ServiceAuthDbAdmin.apiUrl;
  db_auth: any = ServiceAuthDbAdmin.db_info;
  db: any =  new PouchDB( this.apiURL, {
    auth: { username: this.db_auth.user_name, password: this.db_auth.user_password }
  });*/

  constructor() {
  }



  /** user sedela management  : CREATE | GET | UPDATE|  DELETE  */

  public async getAllUsers() {
    let listusers: any = [];
    await this.db.allDocs({ include_docs: true }).then(function (resultat) {

      if (resultat['total_row'] != 0) {
        //let docs = resultat['rows'];
        for (let docs of resultat.rows) {
          listusers.push(docs.doc);
        }
      }
    });

    return listusers;

  }



  public async getAllUsersBis() {
    // let resultatbi = [];
    return await this.db.allDocs({ include_docs: true });
  }



  public async getUserById(id: string) {
    return await this.db.get(id);
  }



  public async register(user: NewUser) {
    return await this.db.put(user);
  }

  public updateUser(user: User) {

  }

  public deleteUser(id: any) {
    this.db.get(id).then(function (usr) {
      return this.db.remove(usr);
    });
  }

  /** user documents management  : CREATE | GET | UPDATE|  DELETE  */

  public async createDocument(user: User) {
    return await this.db.put(user);
  }


  public getDocumentByID(docID: string, documents_list: any[]) {
    return documents_list.filter(docs => docs.document_name === docID);

  }

  public updateDocument(docID, doc_content, doc_comment, documents_list: Document[]) {
    for (let i = 0; i < documents_list.length; i++) {
      if (docID === documents_list[i].document_name) {
        documents_list[i].document_content = doc_content;
        documents_list[i].document_comments = doc_comment;
        documents_list[i].last_date_modified = new Date();
        return documents_list;
      }

    }

  }

  public deleteDocument(document_name, documents_list) {
    let index = documents_list.findIndex(doc => doc.document_name === document_name);
    documents_list.splice(index, 1);
    return documents_list;
  }

  public deleteDocumentVersionFirst(document_name, documents_list) {

    return documents_list.filter(doc => doc.document_name != document_name);
  }

  public shareDocumentWithTeacher(document_name, student_email, teacher_email) {
    this.getUserById('doc_' + teacher_email).then((result: User) => {
      let index = result.list_of_contacts.findIndex(student => student.contact_id === student_email);
      //console.log('index:',index);
      // console.log(' result.list_of_contacts[index]:',  result.list_of_contacts[index]);
      result.list_of_contacts[index].list_of_sharing_documents.push(document_name);
      this.createDocument(result).then(function () {
        console.log('document partagé');
      });
    });

  }

  // tri décroisssant des documents
  public sortBylastDateModified(list_of_document) {
    return list_of_document.sort((a, b) => {
      return <any>new Date(b.last_date_modified) - <any>new Date(a.last_date_modified);

    });
  }

  // tri croissant des commentaires
  public sortPostsBylastDateCreated(list_of_comments) {
    return list_of_comments.sort((a, b) => {
      return <any>new Date(a.date_posted) - <any>new Date(b.date_posted);

    });
  }

}
