import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ y: -30 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                    <AlertTriangle size={80} className="text-orange-600" />
                </motion.div>

                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-6">
                    Oops! The page you’re looking for doesn't exist.
                </p>
                <p className="text-md text-gray-600 mb-8">
                    It may have been moved, deleted, or you might have typed the wrong URL.
                </p>

                <Link to="/" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-all duration-300">
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
