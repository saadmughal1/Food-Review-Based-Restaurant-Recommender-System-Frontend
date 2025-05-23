import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, of } from "rxjs"
import { Restaurant } from "../../types/restaurant"
import { AuthService } from "../../auth/auth.service"
import { RestaurantService } from "../restaurant/restaurant.service"

@Injectable({
  providedIn: "root",
})
export class RecommendationService {
  private apiUrl = "api/recommendations" // Replace with your actual API URL

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private restaurantService: RestaurantService,
  ) {}

  getRecommendations(): Observable<Restaurant[]> {
    // For development, we'll simulate recommendations by returning a subset of restaurants
    // In a real app, this would call your backend recommendation engine
    return new Observable<Restaurant[]>((observer) => {
      this.restaurantService.getRestaurants().subscribe((restaurants) => {
        // Simulate personalized recommendations by shuffling and taking a subset
        const shuffled = [...restaurants].sort(() => 0.5 - Math.random())
        const recommendations = shuffled.slice(0, 2)
        observer.next(recommendations)
        observer.complete()
      })
    })

    // Actual implementation:
    // const userId = this.authService.currentUser?.id;
    // return this.http.get<Restaurant[]>(`${this.apiUrl}/user/${userId}`);
  }

  getPersonalizedRecommendations(): Observable<Restaurant[]> {
    // In a real app, this would call your backend with user preferences
    const user = this.authService.currentUser
    if (!user) {
      return of([])
    }

    return new Observable<Restaurant[]>((observer) => {
      this.restaurantService.getRestaurants().subscribe((restaurants) => {
        // Simulate personalized recommendations
        // In a real app, this would be handled by your ML algorithm
        const recommendations = restaurants.filter((r) => r.averageRating && r.averageRating > 4.0)
        observer.next(recommendations)
        observer.complete()
      })
    })

    // Actual implementation:
    // const userId = this.authService.currentUser?.id;
    // return this.http.get<Restaurant[]>(`${this.apiUrl}/personalized/${userId}`);
  }

  getSimilarRestaurants(restaurantId: number): Observable<Restaurant[]> {
    // Simulate similar restaurant recommendations
    return new Observable<Restaurant[]>((observer) => {
      this.restaurantService.getRestaurants().subscribe((restaurants) => {
        const currentRestaurant = restaurants.find((r) => r.id === restaurantId)
        if (!currentRestaurant) {
          observer.next([])
          observer.complete()
          return
        }

        // Find restaurants with similar cuisine types
        const similar = restaurants.filter(
          (r) => r.id !== restaurantId && r.cuisineType.some((c) => currentRestaurant.cuisineType.includes(c)),
        )

        observer.next(similar)
        observer.complete()
      })
    })

    // Actual implementation:
    // return this.http.get<Restaurant[]>(`${this.apiUrl}/similar/${restaurantId}`);
  }
}
