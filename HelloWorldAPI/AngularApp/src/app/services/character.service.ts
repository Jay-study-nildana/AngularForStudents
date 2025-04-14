import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Character {
  id?: number; // Optional ID
  name: string;
  comicId: number;
  comicTitle: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = `${environment.apiUrl}/api/Characters`;

  constructor(private http: HttpClient) {}

  createCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(`${this.apiUrl}/CreateCharacter`, character);
  }
}