import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loginLottie from '../../assets/lotties/Home.json';

const Service = () => {
    return (
        <div>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center lg:text-left"
            >
                <Lottie style={{ width: '400px' }} animationData={loginLottie} loop={true} />
            </motion.div>
            
        </div>
    );
};

export default Service;