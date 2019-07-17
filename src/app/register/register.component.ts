import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';

import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, MinLengthValidator } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { User, NewUser } from '../model/user.model';
//import { UserService } from '../service/user/user.service';
import { SedelaModelService } from '../service/sedela-model.service';
import { NotificationService } from '../service/notifications/notification.service';
import { UserMail } from '../service/mail-server/user-mail';
import { SendMailService } from '../service/mail-server/send-mail.service';
import { Subscription } from 'rxjs';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public subscription: Subscription;
  matcher: MyErrorStateMatcher;
  user: NewUser = {
    _id: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: 'Etudiant',
    list_of_documents: [],
    list_of_contacts: []

  };

  /*user_tmp: any = {
    _id: '',
    register_code: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: 'Etudiant',
    list_of_documents: [],
    list_of_contacts: []

  };*/
  
  user_mail: UserMail = {
    name: '',
    email: '',
    register_code: ''
  };
  list_of_users: any = [];

  constructor(
    private userservice: SedelaModelService,
    private notification: NotificationService,
    private sendmail : SendMailService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        emailFormControl: new FormControl(this.user.email, [Validators.required, Validators.email]),
        passwordFormControl: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
        firstNameFormControl: new FormControl(this.user.first_name, [Validators.required]),
        lastNameFormControl: new FormControl(this.user.last_name, [Validators.required]),
        statutFormControl: new FormControl('', [Validators.required])
      });
    this.matcher = new MyErrorStateMatcher();
    this.userservice.getAllUsers().then(result => {
      this.list_of_users = result;
      // console.log('listuser register: ', this.list_of_users);
    });
    //console.log('register:',this.registerForm.value);

  }

  /*public onRegister() {
    //this.user._id = this.user.nom.toLowerCase() + '-' + this.user.prenom.toLowerCase();
    this.user._id = 'doc_' + this.user.email;
    if (!this.userExist(this.user.email)) {
      //this.list_of_users.push(this.user);
      this.userservice.register(this.user).then(() => {
        this.resetForms();
        this.notification.showSuccess("inscription réussi. Connectez-vous pour utiliser les services.");
      });


    }
    else {
      this.notification.showError("L'e-mail que vous avez renseigné est déja utilisé par un autre. Réssayer avec un autre");
    }

  }*/

  isError() {
    if (this.registerForm.get('emailFormControl').hasError('required')) {
      return true;
    }

    if (this.registerForm.get('emailFormControl').hasError('email')) {
      return true
    }
    if (this.registerForm.get('passwordFormControl').hasError('required')) {
      return true;
    }

    if (this.registerForm.get('passwordFormControl').hasError('minlength')) {
      return true;
    }

    if (this.registerForm.get('firstNameFormControl').hasError('required')) {
      return true;
    }

    if (this.registerForm.get('lastNameFormControl').hasError('required')) {
      return true;
    }

    if (this.registerForm.get('statutFormControl').hasError('required')) {
      return true;
    }

    return false;
  }

  userExist(user_email) {
    for (let uname of this.list_of_users) {
      if (user_email === uname.email) {
        return true;
      }
    }
    return false;
  }


  resetForms() {

    this.registerForm.get('emailFormControl').clearValidators();
    this.registerForm.get('passwordFormControl').clearValidators();
    this.registerForm.get('firstNameFormControl').clearValidators();
    this.registerForm.get('lastNameFormControl').clearValidators();
    this.registerForm.get('statutFormControl').clearValidators();
    this.registerForm.reset();


  }

  getRandomCodeValidationUsers() {
    return Math.floor((9999 - 1000) * Math.random()) + 1000;
  }

  sendMail(){
    this.user_mail.name =  this.registerForm.get('firstNameFormControl').value + ' ' + this.registerForm.get('lastNameFormControl').value;
    this.user_mail.email = this.registerForm.get('emailFormControl').value;
    this.user_mail.register_code = this.getRandomCodeValidationUsers().toString();
    console.log(this.user_mail);
    console.log(this.user);
    if (!this.userExist(this.user_mail.email )) {
      this.subscription = this.sendmail.sendEmail(this.user_mail).subscribe(
        data =>{
          let msg = data['message'];
      
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "person": JSON.stringify({
                'user_tmp': this.user_mail,
                'user_register': this.user
              })
              
            }
          }
          //this.resetForms();
          this.router.navigate(['/Verification-email'], navigationExtras);
          this.notification.showSuccess(msg);
        },error => {
          console.error(error, "error");
        } 
      );
    
    }
    else {
      this.notification.showError("L'e-mail que vous avez renseigné est déja utilisé par un autre. Réessayer avec un autre");
    }
  }

 


}
