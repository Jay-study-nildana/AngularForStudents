import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Comic {
  id?: number; // Optional ID
  title: string;
  publisherId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  private apiUrl = `${environment.apiUrl}/api/Characters`;

  constructor(private http: HttpClient) {}

  createComic(comic: Comic): Observable<Comic> {
    return this.http.post<Comic>(`${this.apiUrl}/CreateComic`, comic);
  }

  getComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.apiUrl}/GetComics`);
  }
}