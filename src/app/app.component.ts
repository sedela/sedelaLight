import { Component, OnInit, Injectable, Input, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';



@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})


export class AppComponent implements OnInit {

 //composeOptions : email.ComposeOptions;
  constructor(){
   /*this.composeOptions = {
     to: ['niang20042002@gmail.com'],
     subject: "test envoi mail",
     body: 'Hello welcome to sedela'
   }*/

  }
    ngOnInit() {

   // this.sendEmail();
      
     //console.log('register code: ', Math.floor((9999 - 1000) * Math.random()) + 1000);
  } 
  
 /*sendEmail(){
    email.available().then(available =>{
      console.log('the device email status is ', available);
      if(available){
        email.compose(this.composeOptions).then(result =>{
          console.log('send email:', result);
          if(result){
            console.log('mail potetiellement envoyé');
          }
          else{
            console.log('echect envoie mail')
          }
        }).catch(error => console.error(error));
      }
    }).catch(error => console.error(error));
  }
  */

}