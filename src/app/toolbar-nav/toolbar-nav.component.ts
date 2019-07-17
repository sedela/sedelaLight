import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-nav',
  templateUrl: './toolbar-nav.component.html',
  styleUrls: ['./toolbar-nav.component.css']
})
export class ToolbarNavComponent {


  userlogin: any;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userlogin = this.getLogin();
  }
  
  onLogOut(){
    this.authService.logout();
    //console.log('Tentative de déconnexion');
   // localStorage.removeItem('user');
    this.router.navigate(['/Accueil']);
  }

  getLogin() {
    return this.authService.getUser();
  }

 


}
