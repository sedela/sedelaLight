import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { SedelaModelService } from '../service/sedela-model.service';
import { NotificationService } from '../service/notifications/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserMail } from '../service/mail-server/user-mail';
import { NewUser } from '../model/user.model';

@Component({
  selector: 'app-email-confirmaton',
  templateUrl: './email-confirmaton.component.html',
  styleUrls: ['./email-confirmaton.component.css']
})
export class EmailConfirmatonComponent implements OnInit {
  private user_mail: UserMail;
  private user_register: NewUser;
  private person: any;
  userVerifcationForm: FormGroup;
  


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private userservice: SedelaModelService
    ) {
   }

  ngOnInit() {
    this.userVerifcationForm = new FormGroup(
      {userVerificationControl: new FormControl('', [Validators.required])}
    );

    this.route.queryParams.subscribe(params => {
      this.person= JSON.parse(params["person"]);
      this.user_register = this.person.user_register;
      this.user_mail = this.person.user_tmp;
     // console.log('new user:',this.user_register);
     // console.log('with code verify:',this.user_mail);
    });
  }

  public onRegister() {
     let code_verification = this. userVerifcationForm.get('userVerificationControl').value;
     //console.log('mail:',this.user_mail);
     //console.log('verification:', this.user_register);
     this.user_register._id = 'doc_' + this.user_mail.email;
     if (code_verification && code_verification === this.user_mail.register_code) {
      this.userservice.register(this.user_register).then(() => {
        this.notification.showSuccess("inscription réussi. Connectez-vous pour utiliser les services.");
        this.router.navigate(['/Accueil']);
      });

    }
    else {
      this.notification.showError("mauvais code. Vérifier dans vos mail et renseignez le bon code.");
    }

  }
  
}
 

