import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RecommendationService } from '../recommendation.service';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { FormsModule } from '@angular/forms';
import { RestaurantCardComponent } from '../components/restaurant-card/restaurant-card.component';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [FormsModule, RestaurantCardComponent, NgIf, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  featuredRestaurants: Restaurant[] = []
  recommendedRestaurants: Restaurant[] = []
  isLoggedIn = false
  searchQuery = ""

  constructor(
    private restaurantService: RestaurantService,
    private recommendationService: RecommendationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadFeaturedRestaurants();
    this.loadRecommendedRestaurants();
  }

  loadFeaturedRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        console.log('Featured Restaurants:', restaurants); // Debugging
        this.featuredRestaurants = restaurants.slice(0, 3); // Show only the first 3 as featured
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
          console.log('Recommended Restaurants:', restaurants); // Debugging
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
      // Navigate to restaurants page with search query
      window.location.href = `/restaurants?search=${encodeURIComponent(this.searchQuery)}`
    }
  }

}
