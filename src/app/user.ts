export interface User {
    id?: number
    username: string
    email: string
    password?: string
    firstName?: string
    lastName?: string
    isAdmin?: boolean
    preferences?: {
      cuisinePreferences?: string[]
      dietaryRestrictions?: string[]
      priceRange?: string
    }
    createdAt?: Date
    updatedAt?: Date
  }
  