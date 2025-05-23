import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { Review } from "../../types/review"

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  private apiUrl = "api/reviews" // Replace with your actual API URL

  // Mock data for development
  private mockReviews: Review[] = [
    {
      id: 1,
      userId: 1,
      restaurantId: 1,
      rating: 5,
      comment: "Amazing food and great service! Will definitely come back.",
      date: new Date("2023-01-15"),
      username: "john_doe",
      helpful: 12,
    },
    {
      id: 2,
      userId: 2,
      restaurantId: 1,
      rating: 4,
      comment: "Good food but a bit pricey. Nice atmosphere though.",
      date: new Date("2023-02-20"),
      username: "jane_smith",
      helpful: 5,
    },
    {
      id: 3,
      userId: 3,
      restaurantId: 2,
      rating: 5,
      comment: "Best Indian food in town! Authentic flavors and great service.",
      date: new Date("2023-03-10"),
      username: "spice_lover",
      helpful: 8,
    },
    {
      id: 4,
      userId: 1,
      restaurantId: 3,
      rating: 3,
      comment: "Decent burgers but nothing special. Service was quick though.",
      date: new Date("2023-04-05"),
      username: "john_doe",
      helpful: 2,
    },
  ]

  constructor() {}

  getReviewsByRestaurant(restaurantId: number): Observable<Review[]> {
    // Return mock data for development
    const reviews = this.mockReviews.filter((r) => r.restaurantId === restaurantId)
    return of(reviews)

    // Actual implementation:
    // return this.http.get<Review[]>(`${this.apiUrl}/restaurant/${restaurantId}`);
  }

  getReviewsByUser(userId: number): Observable<Review[]> {
    // Return mock data for development
    const reviews = this.mockReviews.filter((r) => r.userId === userId)
    return of(reviews)

    // Actual implementation:
    // return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`);
  }

  addReview(review: Review): Observable<Review> {
    // Simulate adding a review
    const newReview = {
      ...review,
      id: Math.max(...this.mockReviews.map((r) => r.id || 0)) + 1,
      date: new Date(),
      helpful: 0,
    }
    this.mockReviews.push(newReview)
    return of(newReview)

    // Actual implementation:
    // return this.http.post<Review>(this.apiUrl, review);
  }

  updateReview(review: Review): Observable<Review> {
    // Simulate updating a review
    const index = this.mockReviews.findIndex((r) => r.id === review.id)
    if (index !== -1) {
      this.mockReviews[index] = { ...this.mockReviews[index], ...review }
      return of(this.mockReviews[index])
    }
    return of(review)

    // Actual implementation:
    // return this.http.put<Review>(`${this.apiUrl}/${review.id}`, review);
  }

  deleteReview(id: number): Observable<any> {
    // Simulate deleting a review
    const index = this.mockReviews.findIndex((r) => r.id === id)
    if (index !== -1) {
      this.mockReviews.splice(index, 1)
    }
    return of({ success: true })

    // Actual implementation:
    // return this.http.delete(`${this.apiUrl}/${id}`);
  }

  markReviewHelpful(id: number): Observable<Review> {
    // Simulate marking a review as helpful
    const index = this.mockReviews.findIndex((r) => r.id === id)
    if (index !== -1) {
      this.mockReviews[index].helpful = (this.mockReviews[index].helpful || 0) + 1
      return of(this.mockReviews[index])
    }
    return of(this.mockReviews[0]) // Fallback

    // Actual implementation:
    // return this.http.post<Review>(`${this.apiUrl}/${id}/helpful`, {});
  }
}
