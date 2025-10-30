"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usersApi } from "@/lib/api/users";
import { User } from "@/types";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
            return;
        }

        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await usersApi.getProfile();

            setUser(data);
            setName(data.name);
        } catch (err) {
            console.error("Failed to load profile:", err);
            router.push("/login");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const updatedUser = await usersApi.updateProfile({ name });
            
            setUser(updatedUser);
            setIsEditing(false);
        } catch (err: any) {
            setError(err.response?.data?.message?.[0] || "Failed to update profile");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        router.push("/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal information</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Login</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.login}
                                </dd>
                            </div>

                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.email}
                                </dd>
                            </div>

                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditing ? (
                                        <form onSubmit={handleUpdate} className="space-y-2">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                                            />
                                            {error && <p className="text-sm text-red-600">{error}</p>}
                                            <div className="flex space-x-2">
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setName(user.name);
                                                        setError("");
                                                    }}
                                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <span>{user.name}</span>
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="ml-4 text-blue-600 hover:text-blue-500"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </dd>
                            </div>

                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}