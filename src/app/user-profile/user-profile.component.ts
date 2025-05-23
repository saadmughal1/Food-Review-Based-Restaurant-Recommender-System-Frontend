import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from '../review-list/review-list.component';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, CommonModule, ReviewListComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null
  userReviews: Review[] = []
  profileForm!: FormGroup
  preferencesForm!: FormGroup
  activeTab = "profile"
  loading = true
  reviewsLoading = true
  saving = false
  updateSuccess = false
  updateError = ""


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

  dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Halal", "Kosher", "Pescatarian"]

  priceOptions = ["$", "$$", "$$$", "$$$$"]

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForms()
    this.loadUserData()
    this.loadUserPreferences()
  }

  initForms(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      username: [{ value: "", disabled: true }],
    })

    this.preferencesForm = this.formBuilder.group({
      cuisinePreferences: [[]],
      dietaryRestrictions: [[]],
      priceRange: [""],
    })
  }

  loadUserData(): void {
    this.loading = true
    this.currentUser = this.authService.currentUser
    if (this.currentUser) {
      this.profileForm.patchValue({
        firstName: this.currentUser.firstName || "",
        lastName: this.currentUser.lastName || "",
        email: this.currentUser.email || "",
        username: this.currentUser.username || "",
      })
    }
    this.loading = false
  }

  loadUserPreferences(): void {
    this.loading = true
    this.currentUser = this.authService.currentUser

    if (this.currentUser) {

      // Populate preferences form
      this.preferencesForm.patchValue({
        // cuisinePreferences: this.currentUser.preferences?.cuisinePreferences || [],
        // dietaryRestrictions: this.currentUser.preferences?.dietaryRestrictions || [],
        // priceRange: this.currentUser.preferences?.priceRange || "",
      })

      // this.loadUserReviews(this.currentUser.id!)
    }

    this.loading = false
  }

  loadUserReviews(userId: number): void {
    this.reviewsLoading = true
    this.reviewService.getReviewsByUser(userId).subscribe({
      next: (reviews) => {
        this.userReviews = reviews
        this.reviewsLoading = false
      },
      error: (error) => {
        console.error("Error loading user reviews", error)
        this.reviewsLoading = false
      },
    })
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return
    }

    this.saving = true
    this.updateSuccess = false
    this.updateError = ""

    const updatedUser = {
      ...this.currentUser!,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
    }


    this.authService.updateUserProfile(updatedUser).subscribe({
      next: (user) => {
        // this.currentUser = user.data
        // this.updateSuccess = true
        this.saving = false
      },
      error: (error) => {
        console.error("Error updating profile", error.error.message)
        this.updateError = error.error.message
        this.saving = false
      },
    })
  }

  updatePreferences(): void {
    this.saving = true
    this.updateSuccess = false
    this.updateError = ""

    const preferences = {
      cuisinePreferences: this.preferencesForm.value.cuisinePreferences,
      dietaryRestrictions: this.preferencesForm.value.dietaryRestrictions,
      priceRange: this.preferencesForm.value.priceRange,
    }

    this.userService.updatePreferences(this.currentUser!.id!, preferences).subscribe({
      next: (user) => {
        // this.currentUser = user
        // this.authService.updateUserProfile(user).subscribe()
        // this.updateSuccess = true
        // this.saving = false
      },
      error: (error) => {
        console.error("Error updating preferences", error)
        this.updateError = "Failed to update preferences. Please try again."
        this.saving = false
      },
    })

    // this.userService.updatePreferences(1!, preferences).subscribe({
    //   next: (user) => {
    //     this.currentUser = user
    //     this.authService.updateUserProfile(user).subscribe()
    //     this.updateSuccess = true
    //     this.saving = false
    //   },
    //   error: (error) => {
    //     console.error("Error updating preferences", error)
    //     this.updateError = "Failed to update preferences. Please try again."
    //     this.saving = false
    //   },
    // })
  }

  toggleCuisinePreference(cuisine: string): void {
    const currentPreferences = this.preferencesForm.value.cuisinePreferences || []
    const index = currentPreferences.indexOf(cuisine)

    if (index === -1) {
      // Add cuisine
      this.preferencesForm.patchValue({
        cuisinePreferences: [...currentPreferences, cuisine],
      })
    } else {
      // Remove cuisine
      currentPreferences.splice(index, 1)
      this.preferencesForm.patchValue({
        cuisinePreferences: [...currentPreferences],
      })
    }
  }

  toggleDietaryRestriction(restriction: string): void {
    const currentRestrictions = this.preferencesForm.value.dietaryRestrictions || []
    const index = currentRestrictions.indexOf(restriction)

    if (index === -1) {
      // Add restriction
      this.preferencesForm.patchValue({
        dietaryRestrictions: [...currentRestrictions, restriction],
      })
    } else {
      // Remove restriction
      currentRestrictions.splice(index, 1)
      this.preferencesForm.patchValue({
        dietaryRestrictions: [...currentRestrictions],
      })
    }
  }

  setPriceRange(price: string): void {
    this.preferencesForm.patchValue({
      priceRange: price,
    })
  }

  isCuisineSelected(cuisine: string): boolean {
    return (this.preferencesForm.value.cuisinePreferences || []).includes(cuisine)
  }

  isDietarySelected(restriction: string): boolean {
    return (this.preferencesForm.value.dietaryRestrictions || []).includes(restriction)
  }

  isPriceSelected(price: string): boolean {
    return this.preferencesForm.value.priceRange === price
  }

}
