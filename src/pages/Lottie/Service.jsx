import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loginLottie from '../../assets/lotties/Home.json';

const Service = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Text Section */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 text-center lg:text-left w-11/12 max-w-4xl"
            >
                <h1 className="text-4xl font-extrabold text-yellow-500 mb-4">
                    Welcome to Echo Serve
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Discover top-quality professional services tailored to your needs.
                    Browse, compare, and connect with experts in web development, design, marketing, writing, consulting, and more — all in one seamless platform.
                </p>
                <p className="text-md text-gray-600 leading-relaxed">
                    Whether you’re looking to launch your next project or scale your business, Echo Serve makes it simple and reliable to find trusted professionals who deliver exceptional results.
                </p>
            </motion.div>

            {/* Animation Section */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center w-full"
            >
                <Lottie style={{ width: '1200px', maxWidth: '100%' }} animationData={loginLottie} loop={true} />
            </motion.div>
        </div>
    );
};

export default Service;
