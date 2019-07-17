import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from'@angular/flex-layout';
import { ToastrModule } from 'ng6-toastr-notifications';


// Angular Material
import {
 
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';



import { AppComponent} from './app.component'; 
import {DialogOverviewExampleDialog } from '../app/page-etudiant/page-etudiant.component';
import { QuillModule } from 'ngx-quill';
import { DataService } from './appmodel.service';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TypicodeInterceptor } from './typicode.interceptor';
import { AppModelComponent } from './appmodel.component';
import { AppForumComponent } from './appforum.component';


import { RadioNgModelExample } from './formulaireEnquete/radio-ng-model-example';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './service/auth/auth.service';
import { PageEtudiantComponent } from './page-etudiant/page-etudiant.component';
import { PageIngenieurPedagogiqueComponent } from './page-ingenieur-pedagogique/page-ingenieur-pedagogique.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './service/auth/auth.guard';
import { PouchdbService } from './service/pouchdb/pouchdb.service';
import { OrderByPipe } from './Pipe/order-by.pipe';
import { ToolbarNavComponent } from './toolbar-nav/toolbar-nav.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NotificationService } from './service/notifications/notification.service';
import { ServiceAuthDbAdmin } from './config';
import { EmailConfirmatonComponent } from './email-confirmaton/email-confirmaton.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';



@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog,
    RadioNgModelExample,
    AppModelComponent,
    AppForumComponent,
    LoginComponent,
    HomeComponent,
    PageEtudiantComponent,
    PageIngenieurPedagogiqueComponent,
    RegisterComponent,
    AdminComponent,
    OrderByPipe,
    ToolbarNavComponent,
    EmailConfirmatonComponent,
    PasswordRecoveryComponent

    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    HttpClientModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    DragDropModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    AppRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ToastrModule.forRoot()
    
  ],

  entryComponents: [DialogOverviewExampleDialog,RadioNgModelExample],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: TypicodeInterceptor,
     multi: true
   },
    
    DataService,
    AuthService,
    AuthGuard,
    PouchdbService,
    NotificationService
   
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
