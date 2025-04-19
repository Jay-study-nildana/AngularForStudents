import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: string[] = [];
  isLoading = true;
  error: string | null = null;
  lastUpdated: Date | null = null;

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.error = null;
    
    this.charactersService.getReaderCharacters().subscribe({
      next: (data) => {
        this.characters = data;
        this.lastUpdated = new Date();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching characters', err);
        if (err.status === 403) {
          this.error = 'You do not have the required permissions to view characters.';
        } else if (err.status === 401) {
          this.error = 'Authentication required. Please log in to view characters.';
        } else {
          this.error = 'Failed to load characters. Please try again later.';
        }
        this.isLoading = false;
      }
    });
  }
}