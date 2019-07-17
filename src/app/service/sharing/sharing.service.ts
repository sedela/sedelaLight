import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private url: string;
  private dbname; string;
  constructor() { }


 
  shareDocument(personne:any,url,document_name){
    let db = new PouchDB(personne.link);
    let liste = [];
     db.get(personne.ressourcename).then(doc =>{
       console.log("ressource partagé", doc);
       let liste = doc['sharing'];
        liste.push({url,document_name});
      doc['sharing'] = liste;
      console.log("personne partagé",doc);
      db.put(doc).then(function(res){
        console.log('document partagé');
      });
    });
    
  }

  getShareDocument(url){
    console.log(url);
    let db = new PouchDB(url);
    let contactliste = [];
    db.allDocs({include_docs: true}).then(function (resultat){
      console.log('all contact',resultat);
      if(resultat['total_row']!=0){
        //let docs = resultat['rows'];
       for(let contact of resultat.rows){
         contactliste.push(contact.doc);
       }
      }
     
    });
    return contactliste;

  }
  
  async getShareDocumentBis(url){
    console.log(url);
    let db = new PouchDB(url);
   //let contactliste = [];
   return await db.allDocs({include_docs: true});

  }

  getAllDocumentCharedByContacId(tab_uri){
    let liste_document_shared =[];
    console.log
    for( let docs of tab_uri){
      let db = new PouchDB(docs.url);
     db.get(docs.document_name).then(res =>{
       //console.log('res',res);
         liste_document_shared.push(res);
       });
    }
    return liste_document_shared;
  }
  
}

