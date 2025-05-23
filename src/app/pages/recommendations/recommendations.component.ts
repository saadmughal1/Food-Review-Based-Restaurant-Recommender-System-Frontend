import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RecommendationService } from '../../services/recommendation/recommendation.service';
import { Restaurant } from '../../types/restaurant';
import { RestaurantCardComponent } from "../../components/restaurant-card/restaurant-card.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recommendations',
  imports: [RestaurantCardComponent, NgIf],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit {
  recommendations: Restaurant[] = []
  loading = true

  constructor(
    private recommendationService: RecommendationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadRecommendations()
  }

  loadRecommendations(): void {
    this.loading = true

    this.recommendationService.getPersonalizedRecommendations().subscribe({
      next: (restaurants) => {
        this.recommendations = restaurants
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading recommendations", error)
        this.loading = false
      },
    })
  }

}
