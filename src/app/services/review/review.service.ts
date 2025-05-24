import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { Review } from "../../types/types"
import { HttpClient } from "@angular/common/http"
import { ApiResponse } from "../../types/types"

@Injectable({
  providedIn: "root",
})
export class ReviewService {



  private mockReviews: Review[] = []

  constructor(private http: HttpClient) { }



  addReview({ rating, date, text, placeId }: {
    rating: number,
    date: string,
    text: string,
    placeId: string,
  }): Observable<ApiResponse<Review>> {
    return this.http.post<ApiResponse<Review>>(`/review/add`, {
      rating,
      date,
      text,
      placeId
    });
  }


  // updateReview(review: Review): Observable<Review> {
  //   // Simulate updating a review
  //   const index = this.mockReviews.findIndex((r) => r.id === review.id)
  //   if (index !== -1) {
  //     this.mockReviews[index] = { ...this.mockReviews[index], ...review }
  //     return of(this.mockReviews[index])
  //   }
  //   return of(review)

  //   // Actual implementation:
  //   // return this.http.put<Review>(`${this.apiUrl}/${review.id}`, review);
  // }

  // deleteReview(id: number): Observable<any> {
  //   // Simulate deleting a review
  //   const index = this.mockReviews.findIndex((r) => r.id === id)
  //   if (index !== -1) {
  //     this.mockReviews.splice(index, 1)
  //   }
  //   return of({ success: true })

  //   // Actual implementation:
  //   // return this.http.delete(`${this.apiUrl}/${id}`);
  // }


}
