import { Injectable, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mesusers: any = [];
  private apiURL: string = 'http://localhost:5984';
  private usersdbName: string = 'sedela-users-db';
  private db: any = new PouchDB(this.apiURL + '/' + this.usersdbName);

  constructor() { }

  getAllUsers() {
    let listusers: any = [];
    this.db.allDocs({ include_docs: true }).then(function (resultat) {

      if (resultat['total_row'] != 0) {
        //let docs = resultat['rows'];
        for (let docs of resultat.rows) {
          listusers.push(docs.doc);
        }
      }

    });
    return listusers;
  }

  async getAllUsersBis() {
    // let resultatbi = [];
    return await this.db.allDocs({ include_docs: true });
  }



  getUserById(id: string) {
    return this.db.get(id);
  }

  register(user) {
    return this.db.put(user);
  }

  update(user: User) {

  }

  delete(id: any) {
    this.db.get(id).then(function (usr) {
      return this.db.remove(usr);
    });
  }


}
