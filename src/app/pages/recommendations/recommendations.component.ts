import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Restaurant } from '../../types/restaurant';
import { RestaurantCardComponent } from "../../components/restaurant-card/restaurant-card.component";
import { CommonModule, NgIf } from '@angular/common';
import { Place } from '../../types/types';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { ResponsebarComponent } from '../../components/responsebar/responsebar.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { forkJoin, map } from 'rxjs';


@Component({
  selector: 'app-recommendations',
  imports: [RestaurantCardComponent, NgIf, RouterModule, CommonModule, SpinnerComponent, ResponsebarComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit {

  private cuisinePreferences: string[] = []
  places: Place[] = []


  responseTime: number = 0;
  totalResults: number = 0;
  loading = false
  error = ""
  message = ""

  constructor(
    private authService: AuthService,
    private restaurant: RestaurantService
  ) { }

  ngOnInit(): void {
    this.authService.loadPreferences()
      .subscribe({
        next: (preferences) => {
          this.cuisinePreferences = preferences.data.cuisine
          this.loading = false
          this.loadRecommendations()
        },
        error: (error) => {
          console.error("Error loading preferences", error)
          this.loading = false
        },
      })
  }


  loadRecommendations(): void {
    if (this.cuisinePreferences.length === 0) {
      this.message = "No cuisines selected";
      return;
    }

    this.loading = true;
    const startTime = performance.now();

    const observables = this.cuisinePreferences.map(cuisine =>
      this.restaurant.getPlaces(cuisine, null).pipe(
        map(places => {
          return places.map(place => ({
            ...place,
            cuisine: cuisine
          }));
        })
      )
    );

    forkJoin(observables).subscribe({
      next: (results) => {
        const allPlaces = results.flat(); // merge arrays
        this.totalResults = allPlaces.length;
        this.places = this.shuffleArray(allPlaces);

        const endTime = performance.now();
        this.responseTime = Math.round(endTime - startTime);
      },
      error: (error) => {
        console.error("Error loading recommendations", error);
        this.message = "No recommendations available at the moment.";
      },
      complete: () => {
        this.loading = false;
      }
    });
  }



  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



}
