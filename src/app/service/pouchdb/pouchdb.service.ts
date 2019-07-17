import { Injectable, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import { Document} from 'src/app/model/document';


@Injectable({
  providedIn: 'root'
})
export class PouchdbService {
   private apiURL: string = 'http://localhost:5984';
   private nameUserDB: string = 'mydb';
   private   db:any = new PouchDB(this.apiURL+'/'+this.nameUserDB);
  
 

  constructor() { 
    
  }
  
  infos(){
     this.db.info().then(function (info) {
      console.log(info);
    });
   }

   public async createDocument(document: Document){
     return await this.db.put(document);
   }
   
      public async getDocumentByID(docID: string){
        return await  this.db.get(docID);
      }

      public  updateDocumentContent(docID,doc_content,doc_comments){
        // fetch docID
        //let document: Document;
       this.getDocumentByID(docID).then( doc =>{
          doc.document_content = doc_content;
          doc.last_date_modified = new Date ();
          //ajouter le lundi 04 mars
          doc.document_comments = doc_comments;
          console.log('doc apres modif',doc);
           this.createDocument(doc).then(function(res) {
            console.log("document modifié");
            });
          });
      }

  public updateDocumentComments(docID: any,doc_comments: any){
    // fetch docID
      this.db.get(docID).then(function (doc) {
        // update their comments
        doc.document_comment = doc_comments;
        // put them back
        return this.db.put(doc);
      }).then(function () {
        // fetch docID again
        return this.db.get('docID');
      }).then(function (doc) {
        console.log(doc);
      });
        
  }
   
  //recupere tous les doucments ou les versions d'un document
  public getAllDocuments(){
    let listedocument = [];
     this.db.allDocs({include_docs: true}).then(function (resultat){
       console.log('tous les document', resultat);
     //  console.log('nombre de rows',resultat['total_rows']);
        
       if(resultat['total_row']!=0){
         let docs = resultat['rows'];
        for(let i in docs){
          listedocument[i] = docs[i].doc;
        }
       }
      
     });
     return listedocument;

  }

  public deleteDocument(docID: any){
    this.db.get(docID).then(function (doc) {
      return this.db.remove(doc);
    });

  } 
    
}
