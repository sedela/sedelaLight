import { Component, OnInit, Injectable } from '@angular/core'; // importing the OnInit interface

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import { Document, Comment} from './document';


interface DataResponse {
  ops: string;
}
@Injectable()
export class DataService {
   apiURL: string = 'http://localhost:5984';
  constructor(  private http: HttpClient) {}
  // tslint:disable-next-line:one-line
    public createDocument (document: Document) {

      //return this.http.post(`${this.apiURL}/mydb/`, document);
      return this.http.post(this.apiURL+'/mydb/', document);

    }
    public getDocumentByName(doc_id: string){
      return this.http.get(`${this.apiURL}/mydb/${doc_id}`);
    }

    public updateDocumentByName(document: Document){
    
      console.log('document à modifer', document);
       return this.http.put(`${this.apiURL}/mydb/${document.id_document}`,document);
    }
     
    //recupere tous les doucments ou les versions d'un document
    public getAllDocuments(){
     
     return this.http.get(`${this.apiURL}/mydb/_all_docs`);
   
     
    }

    public getDelta(){
        return this.http.get('http://localhost:5984/mydb/mydochtml');
    }

    public postDelta(ops: any, name:string){
      this.http.post('http://localhost:5984/mydb/', {
        ops:ops,
        doc_name: name
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
  
  }
    
}
