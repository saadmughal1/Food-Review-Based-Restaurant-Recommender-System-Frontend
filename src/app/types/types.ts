export interface User {
    _id?: string
    username: string
    email: string
    firstName?: string
    lastName?: string
}

export interface LoginData {
    statusCode: number
    message: string
    success: string
    data: {
        accessToken: string
        refreshToken: string
        user: User
    }
}

export interface LogoutData {
    statusCode: number
    message: string
    success: string
    data: {}
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    statusCode: number;
    success: boolean;
}



export interface Place {
    business_status: string;
    formatted_address: string;
    icon: string;
    name: string;
    opening_hours: {
        open_now: boolean;
        weekday_text: string[]

    }
    place_id: string;
    rating: number;
    types: string[];
    user_ratings_total: number
    photos: Array<{
        height: number;
        width: number;
        html_attributions: string[];
        photo_reference: string;
    }>



    website?: string;
    url?: string;
    takeout?: boolean;
    serves_vegetarian_food?: boolean;
    serves_lunch?: boolean;
    serves_dinner?: boolean;
    serves_brunch?: boolean;
    serves_breakfast?: boolean;
    reviews: Review[];
    international_phone_number?: string;
    formatted_phone_number?: string;
    dine_in?: boolean;
    delivery?: boolean;
}



export interface Review {
    author_name: string;
    author_url: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
}
