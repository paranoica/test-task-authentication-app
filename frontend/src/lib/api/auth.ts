import { apiClient } from "./client";
import { AuthResponse, RegisterData, LoginData } from "@/types";

export const authApi = {
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>("/auth/register", data);
        return response.data;
    },

    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>("/auth/login", data);
        return response.data;
    },
};