import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = `${environment.apiUrl}/WeatherForecast/GetRandomQuote`;

  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}