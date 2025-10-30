export interface User {
    id: string;
    login: string;
    email: string;
    name: string;
    createdAt: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export interface RegisterData {
    login: string;
    email: string;
    password: string;
    name: string;
}

export interface LoginData {
    loginOrEmail: string;
    password: string;
}