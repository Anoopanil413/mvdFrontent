
import React from 'react'
import { Link } from 'react-router-dom'
import 'tailwindcss/tailwind.css'

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-400 animate-bounce">404</h1>
                <p className="text-2xl font-semibold mt-4">Page Not Found</p>
                <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300">
                    Go Home
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound