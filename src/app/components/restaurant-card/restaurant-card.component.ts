import { Component, Input } from '@angular/core';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { RouterModule } from '@angular/router';
import { Place } from '../../types/types';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-restaurant-card',
  imports: [StarRatingComponent, RouterModule],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css'
})
export class RestaurantCardComponent {

  @Input() place!: Place;


  getDefaultImage(): string {
    return "/assets/images/restaurant-placeholder.jpg"
  }

  getPhotoUrl(): string {
    if (this.place.photos && this.place.photos.length > 0) {
      const photoRef = this.place.photos[0].photo_reference;
      const apiKey = environment.GOOGLE_MAP_API_KEY;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${apiKey}`
    }
    return ""

  }

}
