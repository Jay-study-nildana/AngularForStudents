import { Component, OnInit } from '@angular/core';
import { PublisherService, Publisher } from '../../services/publisher.service';

@Component({
  selector: 'app-create-publisher',
  templateUrl: './create-publisher.component.html',
  styleUrls: ['./create-publisher.component.css']
})
export class CreatePublisherComponent implements OnInit {
  publisher: Publisher = { name: '' }; // Initialize with an empty name
  response: Publisher | null = null; // Store the response
  errorMessage: string = ''; // Store error messages
  publishers: Publisher[] = []; // Store the list of publishers

  constructor(private publisherService: PublisherService) {}

  ngOnInit(): void {
    this.loadPublishers(); // Fetch publishers on component initialization
  }

  createPublisher(): void {
    this.publisherService.createPublisher(this.publisher).subscribe({
      next: (response) => {
        this.response = response;
        this.errorMessage = '';
        this.loadPublishers(); // Refresh the list of publishers
      },
      error: (err) => {
        console.error('Error creating publisher:', err);
        this.errorMessage = 'Failed to create publisher. Please try again.';
      }
    });
  }

  loadPublishers(): void {
    this.publisherService.getPublishers().subscribe({
      next: (publishers) => {
        this.publishers = publishers;
      },
      error: (err) => {
        console.error('Error fetching publishers:', err);
        this.errorMessage = 'Failed to load publishers. Please try again.';
      }
    });
  }
}