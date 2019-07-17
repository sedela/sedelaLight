import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiURL: string = 'http://localhost:5984';
   private studentcontactDB: string = 'etudiant-contact';
  // private teachercontactDB: string = 'enseignant-contact';
   private   db:any = new PouchDB(this.apiURL+'/'+this.studentcontactDB);
  constructor() { }
   getAllcontacts(){
     let contactliste = [];
    this.db.allDocs({include_docs: true}).then(function (resultat){
      
      if(resultat['total_row']!=0){
        let docs = resultat['rows'];
       for(let i in docs){
         contactliste[i] = docs[i].doc;
       }
      }
     
    });
    return contactliste;
  }
}
