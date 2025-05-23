export interface Restaurant {
  id?: number
  name: string
  description: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email?: string
  website?: string
  cuisineType: string[]
  priceRange: string
  openingHours: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  images?: string[]
  averageRating?: number
  reviewCount?: number
  createdAt?: Date
  updatedAt?: Date
}
