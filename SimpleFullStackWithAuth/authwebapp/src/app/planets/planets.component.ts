import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../services/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  planets: string[] = [];
  isLoading = true;
  error: string | null = null;
  lastUpdated: Date | null = null;

  constructor(private planetsService: PlanetsService) { }

  ngOnInit(): void {
    this.loadPlanets();
  }

  loadPlanets(): void {
    this.isLoading = true;
    this.error = null;
    
    this.planetsService.getProtectedPlanets().subscribe({
      next: (data) => {
        this.planets = data;
        this.lastUpdated = new Date();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching planets', err);
        if (err.status === 401) {
          this.error = 'Authentication required. Please log in to view planets.';
        } else {
          this.error = 'Failed to load planets. Please try again later.';
        }
        this.isLoading = false;
      }
    });
  }
}