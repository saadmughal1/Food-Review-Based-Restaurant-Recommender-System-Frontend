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
    }
    place_id: string;
    rating: number;
    types: [string];
    user_ratings_total: number
    photos: [
        {
            height: number,
            width: number,
            html_attributions: [string],
            photo_reference: string
        }
    ]
}