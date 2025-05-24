import { Component, Input } from '@angular/core';
import { Restaurant } from '../../types/restaurant';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Place } from '../../types/types';

@Component({
  selector: 'app-restaurant-card',
  imports: [StarRatingComponent, RouterModule, NgFor, NgIf],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css'
})
export class RestaurantCardComponent {

  @Input() place!: Place;
  places: Place[] = []

  getDefaultImage(): string {
    return "/assets/images/restaurant-placeholder.jpg"
  }

  getPhotoUrl(): string {
    if (this.place.photos && this.place.photos.length > 0) {
      const photoRef = this.place.photos[0].photo_reference;
      const apiKey = 'AIzaSyC6s1BhEGBYNNe5aB_FY4MxOKV6yDuoNFU';
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${apiKey}`;
    }
    return ""
    // return this.getDefaultImage();
  }

}
