import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RecommendationService } from '../../services/recommendation/recommendation.service';
import { Restaurant } from '../../types/restaurant';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { Review } from '../../types/review';
import { ReviewService } from '../../services/review/review.service';
import { StarRatingComponent } from "../../components/star-rating/star-rating.component";
import { ReviewFormComponent } from "../../components/review-form/review-form.component";
import { ReviewListComponent } from "../../components/review-list/review-list.component";
import { NgFor, NgIf } from '@angular/common';
import { Place } from '../../types/types';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-restaurant-detail',
  imports: [StarRatingComponent, ReviewFormComponent, ReviewListComponent, NgFor, NgIf, SpinnerComponent],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | null = null
  reviews: Review[] = []
  similarRestaurants: Restaurant[] = []
  reviewsLoading = true
  similarLoading = true
  isLoggedIn = false
  activeTab = "overview"
  showReviewForm = false

  place?: Place
  loading = false
  error = ""

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private reviewService: ReviewService,
    private recommendationService: RecommendationService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn()

    this.route.params.subscribe((params) => {
      const placeId = params["placeId"]

      this.loading = true

      this.restaurantService.getPlace(placeId).subscribe({
        next: (data) => {
          console.log(data)
          this.place = data;
        },
        error: (error) => {
          console.log(error)
          this.error = error.error.message
          this.loading = false
        },
        complete: () => {
          this.loading = false
        },
      })






      this.loadRestaurant(1)
      this.loadReviews(1)
      this.loadSimilarRestaurants(1)
    })
  }

  getPhotoUrl(): string {
    if (this.place?.photos && this.place.photos.length > 0) {
      const photoRef = this.place.photos[0].photo_reference;
      const apiKey = environment.GOOGLE_MAP_API_KEY;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${apiKey}`
    }
    return ""

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
