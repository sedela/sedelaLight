import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private userlogin: any;
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  login(loginForm: any) {
    //this.userlogin = loginForm;
    //console.log('Tentative de connexion');


    // Ajout des roles au modèle utilisateur
    let rolesUser = [];
    if (loginForm.role === 'gestionnaire') {
      rolesUser = ['gestionnaire'];
    } else if (loginForm.role === 'Enseignant') {
      rolesUser = ['Enseignant'];
    } else if (loginForm.role === 'Etudiant') {
      rolesUser = ['Etudiant'];
    }

    this.setUser({ login: loginForm.username, email: loginForm.email, roles: rolesUser });

    // On récupère l'url de redirection
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/Accueil';
  }

  hasAnyRole(roles: string[]) {
    const user = this.getUser();
    // const user = this.userlogin;
    for (const role of user.roles) {
      if (roles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  logout() {
    console.log('Tentative de déconnexion');

    this.clearUser();
    //this.router.navigate(['/login']);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    localStorage.removeItem('user');
  }
}