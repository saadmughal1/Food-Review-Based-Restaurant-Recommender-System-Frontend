import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { RestaurantCardComponent } from "../restaurant-card/restaurant-card.component";

@Component({
  selector: 'app-restaurant-list',
  imports: [FormsModule, NgFor, NgIf, StarRatingComponent, RestaurantCardComponent],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit {
  
  restaurants: Restaurant[] = []
  filteredRestaurants: Restaurant[] = []
  loading = true
  searchQuery = ""
  cuisineFilters: string[] = []
  priceFilters: string[] = []
  ratingFilter = 0

  // Available cuisine types and price ranges for filtering
  availableCuisines: string[] = [
    "Italian",
    "Indian",
    "American",
    "Japanese",
    "Thai",
    "Mexican",
    "Mediterranean",
    "Asian",
    "Burgers",
    "French",
  ]
  priceRanges: string[] = ["$", "$$", "$$$", "$$$$"]

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Check if there's a search query in the URL
    this.route.queryParams.subscribe((params) => {
      if (params["search"]) {
        this.searchQuery = params["search"]
      }

      this.loadRestaurants()
    })
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        console.log('Fetched restaurants:', restaurants); // Debugging
        this.restaurants = restaurants;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching restaurants:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.restaurants];
  
    // Apply search query filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.description.toLowerCase().includes(query) ||
        restaurant.cuisineType.some((cuisine) => cuisine.toLowerCase().includes(query)) ||
        restaurant.id?.toString() === query // Ensure this is inside the callback
      );
    }
  
    // Apply cuisine filters
    if (this.cuisineFilters.length > 0) {
      filtered = filtered.filter((restaurant) =>
        restaurant.cuisineType.some((cuisine) => this.cuisineFilters.includes(cuisine))
      );
    }
  
    // Apply price filters
    if (this.priceFilters.length > 0) {
      filtered = filtered.filter((restaurant) => this.priceFilters.includes(restaurant.priceRange));
    }
  
    // Apply rating filter
    if (this.ratingFilter > 0) {
      filtered = filtered.filter((restaurant) => (restaurant.averageRating || 0) >= this.ratingFilter);
    }
  
    this.filteredRestaurants = filtered;
  }

  toggleCuisineFilter(cuisine: string): void {
    const index = this.cuisineFilters.indexOf(cuisine)
    if (index === -1) {
      this.cuisineFilters.push(cuisine)
    } else {
      this.cuisineFilters.splice(index, 1)
    }
    this.applyFilters()
  }

  togglePriceFilter(price: string): void {
    const index = this.priceFilters.indexOf(price)
    if (index === -1) {
      this.priceFilters.push(price)
    } else {
      this.priceFilters.splice(index, 1)
    }
    this.applyFilters()
  }

  setRatingFilter(rating: number): void {
    this.ratingFilter = rating
    this.applyFilters()
  }

  clearFilters(): void {
    this.searchQuery = ""
    this.cuisineFilters = []
    this.priceFilters = []
    this.ratingFilter = 0
    this.applyFilters()
  }

  onSearch(): void {
    this.applyFilters()
  }
}
