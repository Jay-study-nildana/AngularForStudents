import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  private baseUrl = 'https://localhost:7211/api';

  constructor(private http: HttpClient) { }

  getPublicStarships(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/Roles/public/starships`);
  }
}