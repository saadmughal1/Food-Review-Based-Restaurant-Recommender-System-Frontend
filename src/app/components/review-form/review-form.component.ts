import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Review } from '../../types/review';
import { ReviewService } from '../../services/review/review.service';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-review-form',
  imports: [StarRatingComponent, RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnInit {

  @Input() restaurantId!: number
  @Output() reviewSubmitted = new EventEmitter<Review>()
  @Output() cancelled = new EventEmitter<void>()

  reviewForm!: FormGroup
  submitting = false
  error = ""

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ["", [Validators.required, Validators.minLength(10)]],
    })
  }

  onStarClick(event: MouseEvent): void {
    const rating = parseInt((event.target as HTMLElement).getAttribute('data-rating') || '0', 10);
    this.setRating(rating);
  }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      return
    }

    this.submitting = true
    this.error = ""


    console.log(this.reviewForm)

    return;
    const review: Review = {
      userId: 1,
      restaurantId: this.restaurantId,
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment,
      date: new Date(),
    }

    this.reviewService.addReview(review).subscribe({
      next: (newReview) => {
        this.reviewSubmitted.emit(newReview)
        this.submitting = false
      },
      error: (error) => {
        console.error("Error submitting review", error)
        this.error = "Failed to submit review. Please try again."
        this.submitting = false
      },
    })
  }

  onCancel(): void {
    this.cancelled.emit()
  }

  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating })
  }

}
