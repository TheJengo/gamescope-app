import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  success(message: string): void {
    alertify.success(message);
  }

  warning(message: string): void {
    alertify.warning(message);
  }

  error(message: string): void {
    alertify.danger(message);
  }
}
