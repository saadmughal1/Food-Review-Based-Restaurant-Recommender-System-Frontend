import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RecommendationService } from '../recommendation.service';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { FormsModule } from '@angular/forms';
import { RestaurantCardComponent } from '../components/restaurant-card/restaurant-card.component';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RestaurantCardComponent, NgIf, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  featuredRestaurants: Restaurant[] = []
  recommendedRestaurants: Restaurant[] = []
  isLoggedIn = false
  searchQuery = ""
  selectedCity?: { name: string, coords: string };

  cities = [
    { name: 'Lahore', coords: '31.5204,74.3587' },
    { name: 'Karachi', coords: '24.8607,67.0011' },
    { name: 'Islamabad', coords: '33.6844,73.0479' },
    { name: 'Faisalabad', coords: '31.4504,73.1350' },
    { name: 'Rawalpindi', coords: '33.5651,73.0169' },
    { name: 'Multan', coords: '30.1575,71.5249' },
    { name: 'Peshawar', coords: '34.0151,71.5805' },
    { name: 'Quetta', coords: '30.1798,66.9750' },
    { name: 'Sialkot', coords: '32.4945,74.5229' },
    { name: 'Hyderabad', coords: '25.3960,68.3578' }
  ];

  isLoggedIn$: Observable<boolean>;

  constructor(
    private restaurantService: RestaurantService,
    private recommendationService: RecommendationService,
    private authService: AuthService,
  ) {
    this.isLoggedIn$ = this.authService.currentUser$.pipe(
      map(user => !!user)
    );
  }

  ngOnInit(): void {
    this.loadFeaturedRestaurants();
    this.loadRecommendedRestaurants();
  }

  loadFeaturedRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        console.log('Featured Restaurants:', restaurants);
        this.featuredRestaurants = restaurants.slice(0, 3);
      },
      error: (error) => {
        console.error('Error fetching featured restaurants:', error);
      }
    });
  }

  loadRecommendedRestaurants(): void {
    if (this.isLoggedIn) {
      this.restaurantService.getRecommendations().subscribe({
        next: (restaurants) => {
          console.log('Recommended Restaurants:', restaurants);
          this.recommendedRestaurants = restaurants;
        },
        error: (error) => {
          console.error('Error fetching recommended restaurants:', error);
        }
      });
    }
  }

  search(): void {
    if (this.searchQuery.trim()) {
      let url = `/restaurants?search=${encodeURIComponent(this.searchQuery)}`;

      if (this.selectedCity) {
        url += `&location=${encodeURIComponent(this.selectedCity.coords)}`;
      }

      window.location.href = url;
    }
  }

}
