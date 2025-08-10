import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import HomeLottie from '../../assets/lotties/Home.json';

const Service = () => {
    return (
        <div className="flex justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl p-8 lg:max-w-6xl w-full max-w-full"
            >
                {/* Container with responsive flex */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    {/* Text Section */}
                    <div className="text-center lg:text-left lg:w-1/2">
                        <h1 className="text-4xl text-blue-500 font-extrabold mb-4">
                            Welcome to Echo Serve
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Discover top-quality professional services tailored to your needs.
                            Browse, compare, and connect with experts in web development, design, marketing, writing, consulting, and more — all in one seamless platform.
                        </p>
                        <p className="text-md text-gray-600 leading-relaxed">
                            Whether you’re looking to launch your next project or scale your business, Echo Serve makes it simple and reliable to find trusted professionals who deliver exceptional results.
                        </p>
                    </div>

                    {/* Animation Section */}
                    <div className="flex justify-center lg:w-1/2 w-full">
                        <Lottie
                            style={{ width: '100%', maxWidth: 600 }}
                            animationData={HomeLottie}
                            loop={true}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Service;
