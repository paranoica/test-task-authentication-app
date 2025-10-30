"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { LoginData } from "@/types";

export default function LoginForm() {
    const router = useRouter();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();

    const onSubmit = async (data: LoginData) => {
        setIsLoading(true);
        setError("");

        try {
            const response = await authApi.login(data);
            
            localStorage.setItem("accessToken", response.accessToken);
            router.push("/profile");
        } catch (err: any) {
            const errorMessage = err.response?.data?.message?.[0] || "Login failed";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
            <div>
                <label htmlFor="loginOrEmail" className="block text-sm font-medium text-gray-700">
                    Login or Email
                </label>
                <input
                    {...register("loginOrEmail", {
                        required: "Login or Email is required",
                    })}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border"
                />
                {errors.loginOrEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.loginOrEmail.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    {...register("password", {
                        required: "Password is required",
                    })}
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border"
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}