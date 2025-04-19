import { Component, OnInit } from '@angular/core';
import { StarshipsService } from '../services/starships.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {
  starships: string[] = [];
  favorites: boolean[] = [];
  isLoading = true;
  error: string | null = null;
  lastUpdated: Date | null = null;

  constructor(private starshipsService: StarshipsService) { }

  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships(): void {
    this.isLoading = true;
    this.error = null;
    
    this.starshipsService.getPublicStarships().subscribe({
      next: (data) => {
        this.starships = data;
        // Initialize favorites array with false values for each starship
        this.favorites = new Array(data.length).fill(false);
        this.lastUpdated = new Date();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching starships', err);
        this.error = 'Failed to load starships. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  toggleFavorite(index: number): void {
    this.favorites[index] = !this.favorites[index];
    // In a real app, you might want to persist this to localStorage or an API
  }

  viewDetails(ship: string): void {
    // In a real app, this would navigate to a details page or open a modal
    alert(`Details for ${ship}\n\nThis is a placeholder. In a real application, this would show detailed information about ${ship}.`);
  }
}