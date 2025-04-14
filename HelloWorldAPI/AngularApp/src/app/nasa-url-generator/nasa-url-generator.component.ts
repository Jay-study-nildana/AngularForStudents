import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nasa-url-generator',
  templateUrl: './nasa-url-generator.component.html',
  styleUrls: ['./nasa-url-generator.component.css']
})
export class NasaUrlGeneratorComponent {
  apiKey: string = ''; // Holds the user input for the API key
  generatedUrl: string | null = null; // Holds the generated URL
  apiResponse: any = null; // Holds the response from the NASA API
  errorMessage: string | null = null; // Holds error messages
  isLoading: boolean = false; // Tracks the loading state

  constructor(private http: HttpClient) {}

  generateUrl(): void {
    this.generatedUrl = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`;
  }

  fetchData(): void {
    if (!this.generatedUrl) {
      this.errorMessage = 'Please enter your NASA API key and generate the URL first.';
      return;
    }

    // Clear previous error and response
    this.errorMessage = null;
    this.apiResponse = null;

    // Set loading state to true
    this.isLoading = true;

    // Fetch data from the NASA API
    this.http.get(this.generatedUrl).subscribe(
      (response) => {
        this.apiResponse = response;
        this.isLoading = false; // Set loading state to false
      },
      (error) => {
        console.error('Error fetching data from NASA API:', error);
        this.errorMessage = 'Failed to fetch data from NASA API. Please try again.';
        this.isLoading = false; // Set loading state to false
      }
    );
  }
}