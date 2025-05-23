import { Component, Input } from '@angular/core';
import { Restaurant } from '../../restaurant';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  private searchQuery: string | null = null;
  private location: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.searchQuery = this.route.snapshot.queryParamMap.get('search');
    this.location = this.route.snapshot.queryParamMap.get('location');


    if (!this.searchQuery) {
      this.router.navigate(['/']);
    }

    console.log('Search:', this.searchQuery);
    console.log('Location:', this.location);
  }


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
