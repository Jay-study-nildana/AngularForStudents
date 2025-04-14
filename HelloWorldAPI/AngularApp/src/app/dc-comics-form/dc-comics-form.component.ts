import { Component } from '@angular/core';

@Component({
  selector: 'app-dc-comics-form',
  templateUrl: './dc-comics-form.component.html',
  styleUrls: ['./dc-comics-form.component.css']
})
export class DcComicsFormComponent {
  formData = {
    name: '',
    dob: '',
    character: '',
    rating: null,
    movie: ''
  };

  submitted = false;

  onSubmit(): void {
    this.submitted = true;
  }
}