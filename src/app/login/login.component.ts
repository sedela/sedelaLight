import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { UserService } from '../service/user/user.service';

import { User } from '../model/user.model';
import { SedelaModelService } from '../service/sedela-model.service';
import { NotificationService } from '../service/notifications/notification.service';

import { interval, Subscription } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  //providers: [AuthService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  matcher: MyErrorStateMatcher;
  model: any = {};
  listusers: any = [];
  user: User;
  emailmsg_error: string;
  passwordmsg_error: string;
  roles = [];
  activeroute: string;

  subscription: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
    private userservice: SedelaModelService,
    private notification: NotificationService

  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        emailFormControl: new FormControl('', [Validators.required, Validators.email]),
        passwordFormControl: new FormControl('', [Validators.required])
      });

    this.matcher = new MyErrorStateMatcher();
    const source = interval(10000);
    this.subscription = source.subscribe(() =>
    this.userservice.getAllUsers().then(resultat => {
      this.listusers = resultat;
      //console.log(this.listusers);
    })
   )
    
  }

  onLogin() {
    this.model.email = this.loginForm.get('emailFormControl').value;
    this.model.password = this.loginForm.get('passwordFormControl').value;
    if (this.userExist(this.model)) {
      this.model.username = this.user.first_name + ' ' + this.user.last_name;
      this.model.role = this.user.role;
      //this.roles.push(this.model.role)
      if (this.model.email === this.user.email && this.model.password === this.user.password) {
        
        this.authService.login(this.model);
        this.activeRoute();

      }
      else {
        if (!this.ifValidEmail()) {
          this.emailmsg_error = "Please enter an existing email address";
          this.notification.showError(this.emailmsg_error);
        }
        else if (!this.ifValidPassword()) {
          this.passwordmsg_error = "erreur sur le mot de passe, corrigez svp";
          this.notification.showError(this.passwordmsg_error);

        }
      }

    }

    else{
      this.notification.showError('e-mail inexistant corriger ou inscrivez-vous si vous étes pas déja enregistré!');

    }


  }

  emailError() {
/*
    if (this.loginForm.get('emailFormControl').hasError('email') && !this.loginForm.get('emailFormControl').hasError('required')) {

      this.emailmsg_error = " Please enter a valid email address";
      return true;
    }*/

    if (this.loginForm.get('emailFormControl').hasError('required')) {
      this.emailmsg_error = "Svp saisissez votre e-mail";
      return true;
    }

    /*if(!this.ifValidEmail()){
      this.emailmsg_error = "Please enter an existing email address";
      return true;
    }*/

  }
  passwordError() {

    if (this.loginForm.get('passwordFormControl').hasError('required')) {
      this.passwordmsg_error = "Svp saisissez votre de passe";
      return true;
    }

    /* if(!this.ifValidPassword()){
       this.passwordmsg_error = "Enter a valid Password";
       return true;
     }*/

  }
  ifValidPassword() {
    return this.user.password === this.loginForm.get('passwordFormControl').value;
  }

  ifValidEmail() {
    return this.user.email === this.loginForm.get('emailFormControl').value;

  }

  userExist(userlogin) {
    for (let uname of this.listusers) {
      if (userlogin.email === uname.email) {
        this.user = uname;
        //console.log("utilisateur login trouvé:", uname);
        return true;
      }
    }
    return false;
  }


  hasAnyRole(roles: string[]) {
    return this.authService.hasAnyRole(roles);
  }

  activeRoute() {
    if (this.hasAnyRole(['Enseignant'])) {
      //this.activeroute = '/Enseignant';
      this.router.navigate(['/Enseignant']);
    }
    else if (this.hasAnyRole(['Etudiant'])) {
      // this.activeroute = '/Etudiant';
      this.router.navigate(['/Etudiant']);
    }

    else if (this.hasAnyRole(['gestionnaire'])) {
      // this.activeroute = '/Admin';
      this.router.navigate(['/Admin']);
    }

  }
}