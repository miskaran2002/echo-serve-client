import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        id: 1,
        title: "Empower Your Voice",
        description: "Leave honest reviews and help thousands make smarter choices. Every opinion counts in shaping trustworthy services.",
        image: "https://i.ibb.co/2YWxz2JJ/pexels-olly-3761509.jpg",
        cta: "Start Reviewing"
    },
    {
        id: 2,
        title: "Find Services Rated by Real People",
        description: "Browse verified reviews from real users. Get insights, read ratings, and discover services that truly deliver.",
        image: "https://i.ibb.co/Jjfh92NB/pexels-shvetsa-5760878.jpg",
        cta: "Explore Services"
    },
    {
        id: 3,
        title: "Offer a Service? Build Trust with Reviews.",
        description: "Add your service, collect feedback, and grow your credibility through transparent and authentic reviews.",
        image: "https://i.ibb.co/S7Vhys2J/pexels-burst-544966.jpg",
        cta: "Add Your Service"
    },
];

const ThemeSlider = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[300px] md:h-[400px] w-full max-w-5xl mx-auto mt-10 mb-10 rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[index].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                    className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${slides[index].image})` }}
                >
                    {/* Optional Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 z-0"></div>

                    {/* Text and Button Content */}
                    <div className="relative z-10 text-center px-4 md:px-10">
                        <h2 className="text-2xl md:text-4xl text-white font-bold mb-3 drop-shadow-lg">{slides[index].title}</h2>
                        <p className="text-sm md:text-lg text-white mb-4 drop-shadow-md">{slides[index].description}</p>
                        {slides[index].cta && (
                            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-full font-semibold shadow-md">
                                {slides[index].cta}
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${i === index ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThemeSlider;
