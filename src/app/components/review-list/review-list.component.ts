import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Review } from '../../types/review';
import { ReviewService } from '../../services/review/review.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-review-list',
  imports: [StarRatingComponent, RouterModule, NgFor, NgIf],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  @Input() reviews: Review[] = []
  @Input() showRestaurantName = false

  currentUserId: number | null = null

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
  ) {
    // this.currentUserId = this.authService.currentUser?._id || null
    this.currentUserId = 1

  }

  markHelpful(review: Review): void {
    if (!review.id) return

    this.reviewService.markReviewHelpful(review.id).subscribe({
      next: (updatedReview) => {
        const index = this.reviews.findIndex((r) => r.id === updatedReview.id)
        if (index !== -1) {
          this.reviews[index] = updatedReview
        }
      },
      error: (error) => {
        console.error("Error marking review as helpful", error)
      },
    })
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  isCurrentUserReview(review: Review): boolean {
    return this.currentUserId !== null && review.userId === this.currentUserId
  }

}
