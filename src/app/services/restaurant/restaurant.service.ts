import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { tap } from "rxjs"


import { Place } from "../../types/types"
import { Restaurant } from "../../types/restaurant"
import { AuthService } from "../../auth/auth.service"
import { HttpHeaders } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class RestaurantService {


  // Mock data for development
  private mockRestaurants: Restaurant[] = [
    {
      id: 1,
      name: "Delicious Bites",
      description: "A cozy restaurant serving international cuisine with a modern twist.",
      address: "123 Main St",
      city: "Foodville",
      state: "CA",
      zipCode: "12345",
      phone: "(123) 456-7890",
      website: "www.deliciousbites.com",
      cuisineType: ["Italian", "Mediterranean"],
      priceRange: "$$",
      openingHours: {
        monday: "11:00 AM - 10:00 PM",
        tuesday: "11:00 AM - 10:00 PM",
        wednesday: "11:00 AM - 10:00 PM",
        thursday: "11:00 AM - 10:00 PM",
        friday: "11:00 AM - 11:00 PM",
        saturday: "10:00 AM - 11:00 PM",
        sunday: "10:00 AM - 9:00 PM",
      },
      images: ["/assets/images/restaurant1.jpg"],
      averageRating: 4.5,
      reviewCount: 120,
    },
    {
      id: 2,
      name: "Spice Paradise",
      description: "Authentic Indian cuisine with a wide variety of spicy and flavorful dishes.",
      address: "456 Spice Ave",
      city: "Foodville",
      state: "CA",
      zipCode: "12345",
      phone: "(123) 456-7891",
      website: "www.spiceparadise.com",
      cuisineType: ["Indian", "Asian"],
      priceRange: "$$",
      openingHours: {
        monday: "12:00 PM - 10:00 PM",
        tuesday: "12:00 PM - 10:00 PM",
        wednesday: "12:00 PM - 10:00 PM",
        thursday: "12:00 PM - 10:00 PM",
        friday: "12:00 PM - 11:00 PM",
        saturday: "12:00 PM - 11:00 PM",
        sunday: "12:00 PM - 9:00 PM",
      },
      images: ["/assets/images/restaurant2.jpg"],
      averageRating: 4.2,
      reviewCount: 85,
    },
    {
      id: 3,
      name: "Burger Haven",
      description: "Gourmet burgers and craft beers in a casual, friendly atmosphere.",
      address: "789 Burger Blvd",
      city: "Foodville",
      state: "CA",
      zipCode: "12345",
      phone: "(123) 456-7892",
      website: "www.burgerhaven.com",
      cuisineType: ["American", "Burgers"],
      priceRange: "$",
      openingHours: {
        monday: "11:00 AM - 9:00 PM",
        tuesday: "11:00 AM - 9:00 PM",
        wednesday: "11:00 AM - 9:00 PM",
        thursday: "11:00 AM - 9:00 PM",
        friday: "11:00 AM - 10:00 PM",
        saturday: "11:00 AM - 10:00 PM",
        sunday: "11:00 AM - 8:00 PM",
      },
      images: ["/assets/images/restaurant3.jpg"],
      averageRating: 4.0,
      reviewCount: 150,
    },
  ]


  private userId: string | undefined

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = authService.currentUser?._id
  }

  getPlaces(keyword: string, location: string | null): Observable<Place[]> {
    const headers = new HttpHeaders().set('userId', this.userId || '');

    const params = {
      keyword,
      location: location || ''
    };

    return this.http.get<Place[]>('/place', { params, headers });
  }

  getPlace(placeId: string): Observable<Place> {
    return this.http.get<Place>(`/place/${placeId}`)
  }





  getRestaurants(): Observable<Restaurant[]> {
    // Return mock data for development
    return of(this.mockRestaurants)

    // Actual implementation:
    // return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    // Return mock data for development
    const restaurant = this.mockRestaurants.find((r) => r.id === id)
    return of(restaurant as Restaurant)

    // Actual implementation:
    // return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    // Simulate adding a restaurant
    const newRestaurant = {
      ...restaurant,
      id: Math.max(...this.mockRestaurants.map((r) => r.id || 0)) + 1,
      averageRating: 0,
      reviewCount: 0,
    }
    this.mockRestaurants.push(newRestaurant)
    return of(newRestaurant)

    // Actual implementation:
    // return this.http.post<Restaurant>(this.apiUrl, restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    // Simulate updating a restaurant
    const index = this.mockRestaurants.findIndex((r) => r.id === restaurant.id)
    if (index !== -1) {
      this.mockRestaurants[index] = { ...this.mockRestaurants[index], ...restaurant }
      return of(this.mockRestaurants[index])
    }
    return of(restaurant)

    // Actual implementation:
    // return this.http.put<Restaurant>(`${this.apiUrl}/${restaurant.id}`, restaurant);
  }

  deleteRestaurant(id: number): Observable<any> {
    // Simulate deleting a restaurant
    const index = this.mockRestaurants.findIndex((r) => r.id === id)
    if (index !== -1) {
      this.mockRestaurants.splice(index, 1)
    }
    return of({ success: true })

    // Actual implementation:
    // return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchRestaurants(query: string): Observable<Restaurant[]> {
    // Simulate searching restaurants
    const results = this.mockRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisineType.some((c) => c.toLowerCase().includes(query.toLowerCase())),
    )
    return of(results)

    // Actual implementation:
    // return this.http.get<Restaurant[]>(`${this.apiUrl}/search?q=${query}`);
  }

  getRecommendations(): Observable<any[]> {
    // For now, return the same mock data as recommendations
    return of(this.mockRestaurants);
  }
}
