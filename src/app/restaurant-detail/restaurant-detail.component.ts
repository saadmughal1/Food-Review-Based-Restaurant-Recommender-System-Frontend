import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { RecommendationService } from '../recommendation.service';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { StarRatingComponent } from "../components/star-rating/star-rating.component";
import { ReviewFormComponent } from "../review-form/review-form.component";
import { RestaurantCardComponent } from "../components/restaurant-card/restaurant-card.component";
import { ReviewListComponent } from "../review-list/review-list.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-restaurant-detail',
  imports: [StarRatingComponent, ReviewFormComponent, RestaurantCardComponent, ReviewListComponent, NgFor, NgIf],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | null = null
  reviews: Review[] = []
  similarRestaurants: Restaurant[] = []
  loading = true
  reviewsLoading = true
  similarLoading = true
  isLoggedIn = false
  activeTab = "overview"
  showReviewForm = false

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private reviewService: ReviewService,
    private recommendationService: RecommendationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn()

    this.route.params.subscribe((params) => {
      const id = +params["id"]
      this.loadRestaurant(id)
      this.loadReviews(id)
      this.loadSimilarRestaurants(id)
    })
  }

  loadRestaurant(id: number): void {
    this.loading = true
    this.restaurantService.getRestaurant(id).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading restaurant", error)
        this.loading = false
      },
    })
  }

  loadReviews(restaurantId: number): void {
    this.reviewsLoading = true
    this.reviewService.getReviewsByRestaurant(restaurantId).subscribe({
      next: (reviews) => {
        this.reviews = reviews
        this.reviewsLoading = false
      },
      error: (error) => {
        console.error("Error loading reviews", error)
        this.reviewsLoading = false
      },
    })
  }

  loadSimilarRestaurants(restaurantId: number): void {
    this.similarLoading = true
    this.recommendationService.getSimilarRestaurants(restaurantId).subscribe({
      next: (restaurants) => {
        this.similarRestaurants = restaurants
        this.similarLoading = false
      },
      error: (error) => {
        console.error("Error loading similar restaurants", error)
        this.similarLoading = false
      },
    })
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm
  }

  onReviewSubmitted(review: Review): void {
    // Refresh reviews after submission
    this.loadReviews(this.restaurant?.id || 0)
    this.showReviewForm = false
  }

  getDefaultImage(): string {
    return "/assets/images/restaurant-placeholder.jpg"
  }

  getOpeningHoursForToday(): string {
    if (!this.restaurant?.openingHours) return "Hours not available"

    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const today = days[new Date().getDay()]

    return this.restaurant.openingHours[today as keyof typeof this.restaurant.openingHours] || "Closed"
  }

}
