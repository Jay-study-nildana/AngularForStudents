// \about\about.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  // Demo alerts for ngx-bootstrap
  alerts: any[] = [
    {
      type: 'success',
      msg: 'Welcome to our About page!'
    },
    {
      type: 'info',
      msg: 'Learn more about our company and mission.'
    }
  ];

  closeAlert(alert: any): void {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}