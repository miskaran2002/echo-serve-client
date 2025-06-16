import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const CountUpStats = () => {
    const [stats, setStats] = useState({ users: 0, services: 0, reviews: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/platform-stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching stats:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center">Loading statistics...</div>;
    }

    const items = [
        { label: 'Users', value: stats.users },
        { label: 'Services', value: stats.services },
        { label: 'Reviews', value: stats.reviews }
    ];

    return (
        <div className="my-10 px-4 md:px-10">
            <h2 className="text-2xl font-bold text-center mb-6">Platform Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {items.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        className="bg-gradient-to-r from-blue-100 to-blue-300 p-6 rounded-lg shadow"
                    >
                        <h3 className="text-4xl font-bold text-blue-800">
                            <CountUp end={item.value} duration={2} />
                        </h3>
                        <p className="text-lg font-medium mt-2">{item.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CountUpStats;
