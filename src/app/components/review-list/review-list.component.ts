import { Component, Input } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Review } from '../../types/types';

@Component({
  selector: 'app-review-list',
  imports: [StarRatingComponent, RouterModule, NgFor, NgIf],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  @Input() reviews: Review[] = [];
  constructor() { }

  // ngOnInit(): void { }
}
