import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { CommonModule, NgIf } from '@angular/common';
import { Restaurant } from '../../types/restaurant';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { Place } from '../../types/types';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
@Component({
  selector: 'app-restaurants',
  imports: [RestaurantCardComponent, NgIf, RouterModule, CommonModule, SpinnerComponent],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent {
  restaurants: Restaurant[] = [
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
    }
  ]



  places: Place[] = []

  private searchQuery: string | null = null;
  private location: string | null = null;
  loading = false
  error = ""


  constructor(private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService) { }


  ngOnInit(): void {
    this.searchQuery = this.route.snapshot.queryParamMap.get('search');
    this.location = this.route.snapshot.queryParamMap.get('location');


    if (!this.searchQuery) {
      this.router.navigate(['/']);
    }

    this.loading = true

    this.restaurantService.getPlaces(this.searchQuery!, this.location).subscribe({
      next: (data) => {
        this.places = data;
      },
      error: (error) => {
        this.error = error.error.message
        this.loading = false
      },
      complete: () => {
        this.loading = false
      },
    })

  }






}
