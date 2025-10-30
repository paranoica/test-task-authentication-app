import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Auth App</h1>
                <div className="space-x-4">
                    <Link
                        href="/login"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}