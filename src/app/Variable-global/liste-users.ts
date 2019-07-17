import { Injectable, OnInit } from "@angular/core";
import { UserService } from "../service/user/user.service";


export class ListeUsers implements OnInit {
    
    listeusers: any;
    constructor(private userservice: UserService){}
 
    ngOnInit(){
        this.listeusers = this.userservice.getAllUsers();
    }
}
