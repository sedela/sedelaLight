# Welcome to sedela application
![Sedela](https://github.com/momoNiang/SedelaProject/blob/master/sedelaLight/src/assets/pictures/sedela.jpg)

# SedeLight
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.  

Live demo: https://sedela.enstb.org/


## ​​Used technologies

* HTML5, CSS3  
* Angular 7
* NodeJS
* Express
* Couchdb: a NoSql database
* NodeMailer: module for Nodejs to send emails
* Nginx to host sedela application
* Quill: open source WYSIWYG editor built for the modern web

### Model and composants
![Data Model](https://github.com/momoNiang/SedelaProject/blob/master/sedelaLight/src/assets/pictures/DataModel.jpg)


## Features

* Register and authenfication
* Create Document 
* Load document 
* Update document
* Delete document
* Share document between student and teacher
* Chat: allow teachers to comment student's document and student to response them

A **document** is a HTML content.
## Users statut

  Sedela application can be used by three type of users 

  * **Student** : can create, update, comment and share his documents with his teacher
  * **Teacher** : can read and comment on his students' documents
  * **sedela Admin** : can associate teachers with students.



## Screenshots

  ####  Connection View


  ![Connection View](https://github.com/momoNiang/SedelaProject/blob/master/sedelaLight/src/assets/pictures/connectview.png)

  #### Example of Student View
  ![Student View](https://github.com/momoNiang/SedelaProject/blob/master/sedelaLight/src/assets/pictures/studentview.PNG)

  #### Example of Teacher View 

  ![Teacher View](https://github.com/momoNiang/SedelaProject/blob/master/sedelaLight/src/assets/pictures/teacherview.png)  

  #### Admin View

  ![Sedela Admin View](https://github.com/momoNiang/SedelaProject/blob/master/sedelaLight/src/assets/pictures/adminsedelaview.png)


## Setting up the sedela project

* First using sedela in dev mode requires :
    * **npm** version >= 6.4.1`
    * **node.js**  version >= 10.15.0 
    * **Angular CLI** version >= 7.3.8
    * **couchDB** or **MongoDb** 

*  Then clone the app repository and install dependencies:

```sh
# in a terminal run this following commands
$ https://github.com/momoNiang/SedelaProject.git
$ cd sedelalight
$ npm install 
```
## Data service

#### Without Database autentification on localhost

 * First modify the url of database and replace it for your own URL database in **/sedelaLight/src/app/service/sedela-model.service.ts** 
 
 * Then replace **sedeladb** by your database's name

 ```sh
 # Example
 export class SedelaModelService {

  private apiURL: string = 'URl of your database;' 
  private db_name: string = 'name of yourdatabase' ;
  private db: any = new PouchDB(this.apiURL + '/' + this.db_name);
  ----------------------------------
 (following of the code)

}

 ```
 #### With database authenfication on remote server

 * First modify or create  **/sedelaLight/src/app/config.ts**. this parameters are required
    * Login or username of the administrator of the database 
    * Password of the administrator of the database 

 ```sh
 #Example
export const ServiceAuthDbAdmin = {


    apiUrl: 'your remote database URL',
    
    db_info : {
      user_name: 'admin username',
      user_password: 'passeword of admin username'
    }

    
}

 ```

* Then Modifiy **/sedelaLight/src/app/service/sedela-model.service.ts**  like this

 ```sh
#Example
 export class SedelaModelService {

  apiURL: string =  ServiceAuthDbAdmin.apiUrl;
  db_auth: any = ServiceAuthDbAdmin.db_info;
  db: any =  new PouchDB( this.apiURL, {
    auth: { username: this.db_auth.user_name, password: this.db_auth.user_password }
  });
    ----------------------------------
 (following of the code)

}

 ```

## Quill integration in Angular 7

  * First  install Quill  module using npm:
     ```sh
        npm install --save quill
     ```
 *  Then install angular component for the Quill:
     ```sh
       npm install --save ngx-quill
     ```
* Finally add quilljs styling to **angular.json** inside **Styles":[ ]** in **/sedelaLight/angular.json**:
 ```sh
       "node_modules/quill/dist/quill.snow.css",
       "node_modules/quill/dist/quill.bubble.css" 
  ```
see [angular.js](https://github.com/momoNiang/SedelaProject/blob/master/sedelaLight/angular.json)


 #### How Quill is used on sedela project
    
  * Import and declare the QuillModule to NgModule in **/sedelaLight/src/app/app.module.ts**:
   
 ```sh
         @NgModule({
          imports: [
            ...,

            QuillModule
          ],
          ...
        })

       class AppModule { ... }
```
####
 * Now you can use Quill like an angular component: 
```sh

       #use the following code in your templates to add a default quill editor:
      <quill-editor></quill-editor>

```
  
 
In this project quill component is implemented  in **/sedelaLight/src/app/appmodel.component.ts** : 
  [quill-component](https://github.com/momoNiang/SedelaProject/blob/master/sedelaLight/src/app/appmodel.component.ts)


## Development server on localhost
 
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
