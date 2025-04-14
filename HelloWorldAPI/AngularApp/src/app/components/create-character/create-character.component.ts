import { Component, OnInit } from '@angular/core';
import { CharacterService, Character } from '../../services/character.service';
import { ComicService, Comic } from '../../services/comic.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  character: Character = { name: '', comicId: 0, comicTitle: '' }; // Initialize with empty values
  response: Character | null = null; // Store the response
  errorMessage: string = ''; // Store error messages
  comics: Comic[] = []; // Store the list of comics

  constructor(
    private characterService: CharacterService,
    private comicService: ComicService
  ) {}

  ngOnInit(): void {
    this.loadComics(); // Fetch comics on component initialization
  }

  createCharacter(): void {
    this.characterService.createCharacter(this.character).subscribe({
      next: (response) => {
        this.response = response;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error creating character:', err);
        this.errorMessage = 'Failed to create character. Please try again.';
      }
    });
  }

  loadComics(): void {
    this.comicService.getComics().subscribe({
      next: (comics) => {
        this.comics = comics;
      },
      error: (err) => {
        console.error('Error fetching comics:', err);
        this.errorMessage = 'Failed to load comics. Please try again.';
      }
    });
  }
}