import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ReviewService } from '../../services/review/review.service';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from '../../components/review-list/review-list.component';
import { Review } from '../../types/types';
import { User } from '../../types/types';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, CommonModule, ReviewListComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null
  reviews: Review[] = []
  profileForm!: FormGroup
  preferencesForm!: FormGroup
  activeTab = "profile"
  loading = true
  reviewsLoading = true


  saving = false
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



  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForms()
    this.loadUserData()
    this.loadUserPreferences()
    this.loadReviews()
  }

  loadReviews(): void {
    this.reviewsLoading = true

    this.reviewService.loadReviews().subscribe({
      next: (data) => {
        this.reviews.push(...data.data);
      },
      error: (error) => {
        console.log(error)
        this.reviewsLoading = false
      },
      complete: () => {
        this.reviewsLoading = false
      },
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

  initForms(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      username: [{ value: "", disabled: true }],
    })

    this.preferencesForm = this.formBuilder.group({
      cuisinePreferences: [[]],
    })
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return
    }

    this.saving = true
    this.updateError = ""

    const updatedUser = {
      ...this.currentUser!,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
    }


    this.authService.updateUserProfile(updatedUser).subscribe({
      next: (user) => {
        this.currentUser = user.data
        this.saving = false
      },
      error: (error) => {
        console.error("Error updating profile", error.error.message)
        this.updateError = error.error.message
        this.saving = false
      },
    })
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  updatePreferences(): void {
    this.saving = true
    this.updateError = ""

    this.authService.updatePreferences(this.preferencesForm.value.cuisinePreferences)
      .subscribe({
        next: (user) => {
          console.log(user)
          this.saving = false
        },
        error: (error) => {
          console.error("Error updating preferences", error)
          this.updateError = "Failed to update preferences. Please try again."
          this.saving = false
        },
      })
  }

  loadUserPreferences(): void {
    this.loading = true

    this.authService.loadPreferences()
      .subscribe({
        next: (preferences) => {
          this.preferencesForm.patchValue({
            cuisinePreferences: preferences.data.cuisine
          })
          this.loading = false
        },
        error: (error) => {
          console.error("Error loading preferences", error)
          this.loading = false
        },
      })

    this.loading = false
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

  isCuisineSelected(cuisine: string): boolean {
    return (this.preferencesForm.value.cuisinePreferences || []).includes(cuisine)
  }

  isDietarySelected(restriction: string): boolean {
    return (this.preferencesForm.value.dietaryRestrictions || []).includes(restriction)
  }
}
