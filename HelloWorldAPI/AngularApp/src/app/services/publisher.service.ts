import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Publisher {
  id?: number; // Optional ID
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private apiUrl = `${environment.apiUrl}/api/Characters`;

  constructor(private http: HttpClient) {}

  createPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(`${this.apiUrl}/CreatePublisher`, publisher);
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${this.apiUrl}/GetPublishers`);
  }
}