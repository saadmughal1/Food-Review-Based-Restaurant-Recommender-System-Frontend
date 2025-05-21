import { Component, Input } from '@angular/core';
import { Restaurant } from '../../restaurant';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-restaurant-card',
  imports: [StarRatingComponent, RouterModule, NgFor, NgIf],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css'
})
export class RestaurantCardComponent {

  @Input() restaurant!: Restaurant
  restaurants: Restaurant[] = []

  getDefaultImage(): string {
    return "/assets/images/restaurant-placeholder.jpg"
  }

  getShortDescription(description: string): string {
    if (!description) {
      return '';
    }
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }
}
