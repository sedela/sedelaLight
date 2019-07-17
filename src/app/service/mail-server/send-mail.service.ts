import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMail } from './user-mail';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http: HttpClient) { }
  sendEmail(obj): Observable<UserMail> {
    return this.http.post<UserMail>('http://localhost:3000/sendmail', obj);
  }
}
