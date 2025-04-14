import { Component } from '@angular/core';
import { WeatherService, WeatherForecast } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  weatherData: WeatherForecast[] = [];
  loading: boolean = false; // Add loading flag

  constructor(private weatherService: WeatherService) {}

  loadWeatherData(): void {
    this.loading = true; // Set loading to true when the API call starts
    this.weatherService.getWeatherForecast().subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false; // Set loading to false when the API call completes
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
        this.loading = false; // Set loading to false even if there's an error
      }
    });
  }
}