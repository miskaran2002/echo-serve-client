import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loader from '../Loading/Loader';


const CardSection = ({ title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-100 p-6 mb-8 rounded-xl shadow-md"
    >
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">{title}</h2>
        <div className="text-base text-gray-800">{children}</div>
    </motion.div>
);

const About = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto my-10 p-5 font-sans text-gray-900 leading-relaxed"
        >
            <h1 className="text-4xl font-bold text-center mb-10 uppercase tracking-wide text-blue-600">
                About Me
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
                <img
                    src="https://i.ibb.co/8L9xkcLF/photo-myself.jpg"
                    alt="My Portrait"
                    className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-blue-600"
                />

                <div className="max-w-xl">
                    <p className="text-lg text-sky-400 mb-4">
                        Hello! I am a passionate Computer Science student focused on software development, problem solving, and continuous learning.
                    </p>
                    <p className="text-base text-sky-400">
                        I strive to build scalable and efficient applications and love exploring new technologies to improve user experiences.
                    </p>
                </div>
            </div>

            <CardSection title="Education">
                I am currently pursuing a degree in Computer Science & Engineering at the University of Barisal, where I have gained solid foundations in algorithms, data structures, web development, and software engineering principles.
            </CardSection>

            <CardSection title="Research">
                <p className="mb-3">
                    My research interests include urban traffic congestion management, adaptive traffic signal control systems, and data-driven solutions for smart cities.
                </p>
                <a
                    href="https://www.dropbox.com/scl/fi/fqlqoo5l4zjlzli5io287/THE_IMPACT_OF_ARTIFICIAL_INTELLIGENCE_ON_JOB_AUTOMATION.pdf?rlkey=4hwdl91oqseitohih7qgv888x&st=55nosv1h&dl=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    View Research Paper
                </a>
            </CardSection>

            <CardSection title="Activities & Interests">
                In my free time, I enjoy listening to music, playing football and cricket, and sharing light-hearted jokes. I am also keen on teamwork and effective communication.
            </CardSection>

            <CardSection title="Projects">
                <p className="mb-4">
                    I have developed multiple web applications using React, Node.js, and MongoDB. Here are two of my live projects:
                </p>
                <ul className="flex flex-col gap-3">
                    <li>
                        <a
                            href="https://heart-bridge-f100e.web.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            HeartBridge
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://recipe-realm-4ea1f.web.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            RecipeRealm
                        </a>
                    </li>
                </ul>
            </CardSection>

            <CardSection title="More About Me">
                I am highly motivated to learn and grow continuously. Problem-solving is my passion, and I aspire to work at a leading tech company where I can refine my skills and contribute to impactful projects.
            </CardSection>
        </motion.section>
    );
};

export default About;
