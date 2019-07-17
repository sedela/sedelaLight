import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public toastr: ToastrManager) { }
  showSuccess(message: string) {
    this.toastr.successToastr(message, 'succès!');
  }

  showError(message: string, position: any= 'top-full-width') {
    this.toastr.errorToastr(message, 'Oops!');
  }

  showWarning(message: string) {
    this.toastr.warningToastr(message, 'Alert!');
  }

  showInfo(message: string) {
    this.toastr.infoToastr(message, 'Info');
  }



  showToast(message,position: any = 'top-left') {
    this.toastr.infoToastr(message, 'Toast', {
      position: position
    });
  }
}
