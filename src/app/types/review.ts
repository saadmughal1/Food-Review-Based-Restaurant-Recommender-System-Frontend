export interface Review {
    id?: number
    userId: number
    restaurantId: number
    rating: number
    comment: string
    date: Date
    username?: string
    helpful?: number
    images?: string[]
  }
  