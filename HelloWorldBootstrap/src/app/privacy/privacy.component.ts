import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent {
  // Demo accordion state
  isFirstOpen = true;
  
  // Demo for progress bar
  privacyProgress = 75;
  
  // Demo for tooltips
  tooltipText = 'This explains our data handling practices';
}