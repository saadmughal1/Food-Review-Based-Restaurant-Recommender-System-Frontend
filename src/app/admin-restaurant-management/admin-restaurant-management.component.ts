import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-restaurant-management',
  imports: [StarRatingComponent, NgFor, NgIf, ReactiveFormsModule,FormsModule],
  templateUrl: './admin-restaurant-management.component.html',
  styleUrl: './admin-restaurant-management.component.css'
})
export class AdminRestaurantManagementComponent implements OnInit {
  restaurants: Restaurant[] = []
  restaurantForm!: FormGroup
  loading = true
  saving = false
  isEditing = false
  currentRestaurantId: number | null = null
  showForm = false
  searchQuery = ""
  filteredRestaurants: Restaurant[] = []

  cuisineOptions = [
    "Italian",
    "Indian",
    "American",
    "Japanese",
    "Thai",
    "Mexican",
    "Mediterranean",
    "Asian",
    "Burgers",
    "French",
  ]

  priceOptions = ["$", "$$", "$$$", "$$$$"]

  constructor(
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.loadRestaurants()
  }

  initForm(): void {
    this.restaurantForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zipCode: ["", Validators.required],
      phone: ["", Validators.required],
      email: [""],
      website: [""],
      cuisineType: [[]],
      priceRange: ["", Validators.required],
      openingHours: this.formBuilder.group({
        monday: [""],
        tuesday: [""],
        wednesday: [""],
        thursday: [""],
        friday: [""],
        saturday: [""],
        sunday: [""],
      }),
    })
  }

  loadRestaurants(): void {
    this.loading = true
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        this.restaurants = restaurants
        this.applyFilter()
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading restaurants", error)
        this.loading = false
      },
    })
  }

  applyFilter(): void {
    if (!this.searchQuery.trim()) {
      this.filteredRestaurants = [...this.restaurants]
      return
    }

    const query = this.searchQuery.toLowerCase()
    this.filteredRestaurants = this.restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisineType.some((cuisine) => cuisine.toLowerCase().includes(query)) ||
        restaurant.city.toLowerCase().includes(query),
    )
  }

  onSearch(): void {
    this.applyFilter()
  }

  addRestaurant(): void {
    this.isEditing = false
    this.currentRestaurantId = null
    this.restaurantForm.reset({
      cuisineType: [],
      priceRange: "",
      openingHours: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
    })
    this.showForm = true
  }

  editRestaurant(restaurant: Restaurant): void {
    this.isEditing = true
    this.currentRestaurantId = restaurant.id!

    this.restaurantForm.patchValue({
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      city: restaurant.city,
      state: restaurant.state,
      zipCode: restaurant.zipCode,
      phone: restaurant.phone,
      email: restaurant.email || "",
      website: restaurant.website || "",
      cuisineType: restaurant.cuisineType,
      priceRange: restaurant.priceRange,
      openingHours: {
        monday: restaurant.openingHours.monday || "",
        tuesday: restaurant.openingHours.tuesday || "",
        wednesday: restaurant.openingHours.wednesday || "",
        thursday: restaurant.openingHours.thursday || "",
        friday: restaurant.openingHours.friday || "",
        saturday: restaurant.openingHours.saturday || "",
        sunday: restaurant.openingHours.sunday || "",
      },
    })

    this.showForm = true
  }

  deleteRestaurant(id: number): void {
    if (confirm("Are you sure you want to delete this restaurant?")) {
      this.restaurantService.deleteRestaurant(id).subscribe({
        next: () => {
          this.restaurants = this.restaurants.filter((r) => r.id !== id)
          this.applyFilter()
        },
        error: (error) => {
          console.error("Error deleting restaurant", error)
        },
      })
    }
  }

  onSubmit(): void {
    if (this.restaurantForm.invalid) {
      return
    }

    this.saving = true
    const restaurantData = this.restaurantForm.value

    if (this.isEditing && this.currentRestaurantId) {
      // Update existing restaurant
      const updatedRestaurant: Restaurant = {
        ...restaurantData,
        id: this.currentRestaurantId,
      }

      this.restaurantService.updateRestaurant(updatedRestaurant).subscribe({
        next: (restaurant) => {
          const index = this.restaurants.findIndex((r) => r.id === restaurant.id)
          if (index !== -1) {
            this.restaurants[index] = restaurant
            this.applyFilter()
          }
          this.saving = false
          this.showForm = false
        },
        error: (error) => {
          console.error("Error updating restaurant", error)
          this.saving = false
        },
      })
    } else {
      // Add new restaurant
      this.restaurantService.addRestaurant(restaurantData).subscribe({
        next: (restaurant) => {
          this.restaurants.push(restaurant)
          this.applyFilter()
          this.saving = false
          this.showForm = false
        },
        error: (error) => {
          console.error("Error adding restaurant", error)
          this.saving = false
        },
      })
    }
  }

  cancelForm(): void {
    this.showForm = false
  }

  toggleCuisine(cuisine: string): void {
    const cuisines = this.restaurantForm.get("cuisineType")!.value || []
    const index = cuisines.indexOf(cuisine)

    if (index === -1) {
      // Add cuisine
      this.restaurantForm.patchValue({
        cuisineType: [...cuisines, cuisine],
      })
    } else {
      // Remove cuisine
      cuisines.splice(index, 1)
      this.restaurantForm.patchValue({
        cuisineType: [...cuisines],
      })
    }
  }

  isCuisineSelected(cuisine: string): boolean {
    const cuisines = this.restaurantForm.get("cuisineType")!.value || []
    return cuisines.includes(cuisine)
  }

}
