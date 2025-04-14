import { Component, OnInit } from '@angular/core';
import { ComicService, Comic } from '../../services/comic.service';
import { PublisherService, Publisher } from '../../services/publisher.service';

@Component({
  selector: 'app-create-comic',
  templateUrl: './create-comic.component.html',
  styleUrls: ['./create-comic.component.css']
})
export class CreateComicComponent implements OnInit {
  comic: Comic = { title: '', publisherId: 0 }; // Initialize with empty values
  response: Comic | null = null; // Store the response
  errorMessage: string = ''; // Store error messages
  publishers: Publisher[] = []; // Store the list of publishers
  comicsByPublisher: { [key: number]: Comic[] } = {}; // Group comics by publisher

  constructor(
    private comicService: ComicService,
    private publisherService: PublisherService
  ) {}

  ngOnInit(): void {
    this.loadPublishers(); // Fetch publishers on component initialization
    this.loadComics(); // Fetch comics on component initialization
  }

  createComic(): void {
    this.comicService.createComic(this.comic).subscribe({
      next: (response) => {
        this.response = response;
        this.errorMessage = '';
        this.loadComics(); // Refresh the list of comics
      },
      error: (err) => {
        console.error('Error creating comic:', err);
        this.errorMessage = 'Failed to create comic. Please try again.';
      }
    });
  }

  loadPublishers(): void {
    this.publisherService.getPublishers().subscribe({
      next: (publishers) => {
        this.publishers = publishers.filter((publisher) => publisher.id !== undefined && publisher.id !== null);
      },
      error: (err) => {
        console.error('Error fetching publishers:', err);
        this.errorMessage = 'Failed to load publishers. Please try again.';
      }
    });
  }

  loadComics(): void {
    this.comicService.getComics().subscribe({
      next: (comics) => {
        this.groupComicsByPublisher(comics);
      },
      error: (err) => {
        console.error('Error fetching comics:', err);
        this.errorMessage = 'Failed to load comics. Please try again.';
      }
    });
  }

  groupComicsByPublisher(comics: Comic[]): void {
    this.comicsByPublisher = {};
    comics.forEach((comic) => {
      if (comic.publisherId !== undefined && comic.publisherId !== null) {
        if (!this.comicsByPublisher[comic.publisherId]) {
          this.comicsByPublisher[comic.publisherId] = [];
        }
        this.comicsByPublisher[comic.publisherId].push(comic);
      }
    });
  }

  // Helper method to safely get comics for a publisher
  getComicsForPublisher(publisherId: number | undefined): Comic[] {
    if (publisherId !== undefined && publisherId !== null) {
      return this.comicsByPublisher[publisherId] || [];
    }
    return [];
  }

  // Helper method to check if comics are available for a publisher
  isComicsAvailable(publisherId: number | undefined): boolean {
    return this.getComicsForPublisher(publisherId).length > 0;
  }
}