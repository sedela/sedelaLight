import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent} from './login/login.component';
import { AuthGuard } from './service/auth/auth.guard';
import { PageIngenieurPedagogiqueComponent } from './page-ingenieur-pedagogique/page-ingenieur-pedagogique.component';
import { PageEtudiantComponent } from './page-etudiant/page-etudiant.component';
import { AdminComponent } from './admin/admin.component';
import { EmailConfirmatonComponent } from './email-confirmaton/email-confirmaton.component';


const routes: Routes = [
  {path:'', redirectTo : '/Accueil', pathMatch: 'full'},
  {
     path: 'Accueil',
     component: LoginComponent   
  },
  
  {
    path: 'Verification-email',
    component: EmailConfirmatonComponent
 },
 
  {
    path: 'Enseignant',
    canActivate: [AuthGuard],
    component: PageIngenieurPedagogiqueComponent,
    data: {
      roles: ['Enseignant']
    }
  },

  {
    path: 'Etudiant',
    canActivate: [AuthGuard],
    component: PageEtudiantComponent,
    data: {
      roles: ['Etudiant']
    }
    
  },

  {
    path: 'Admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: {
      roles: ['gestionnaire']
    }
    
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }