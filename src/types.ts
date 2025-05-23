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