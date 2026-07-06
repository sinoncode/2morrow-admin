export interface Profile {
    id: number
    name: string
    email: string
    phone: string | null
    avatar: string | null
}

export interface ProfileApiResponse {
    success?: boolean
    message?: string
    data: Profile
}

export interface UpdateProfileData {
    name: string
    phone?: string | null
    avatar?: File | null
}