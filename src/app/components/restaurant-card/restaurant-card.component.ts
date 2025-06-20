import { Component, Input } from '@angular/core';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { RouterModule } from '@angular/router';
import { Place } from '../../types/types';
import { environment } from '../../../environments/environment.development';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-restaurant-card',
  imports: [StarRatingComponent, RouterModule, NgOptimizedImage, CommonModule],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css'
})
export class RestaurantCardComponent {

  isLiked = false;

  @Input() place!: Place;

  toggleLike(event: Event): void {
  event.stopPropagation(); // Prevents triggering card click if any
  this.isLiked = !this.isLiked;
}

  getPhotoUrl(): string {
    if (this.place.photos && this.place.photos.length > 0) {
      const photoRef = this.place.photos[0].photo_reference;
      return `${environment.BASE_URL}/api/place/photo-proxy?photoRef=${photoRef}`;
    }
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop";
  }


}
