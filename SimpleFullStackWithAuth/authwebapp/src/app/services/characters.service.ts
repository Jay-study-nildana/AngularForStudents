import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private baseUrl = 'https://localhost:7211/api';

  constructor(private http: HttpClient) { }

  getReaderCharacters(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/Roles/reader/characters`);
  }
}