import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const AllServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading services:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-xl">Loading all services...</div>;
    }

    return (
        <div className="px-4 md:px-10 py-8">
            <h2 className="text-3xl font-bold text-yellow-500 text-center mb-8">All Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service._id}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden  hover:shadow-2xl transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={service.serviceImage}
                            alt={service.serviceTitle}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-semibold">{service.serviceTitle}</h3>
                            <p className="text-sm text-gray-600">{service.description.slice(0, 100)}...</p>
                            <div className="text-sm text-blue-600 font-medium">Category: {service.category}</div>
                            <div className="text-lg font-bold text-green-600">${service.price}</div>
                            <Link to={`/services/${service._id}`}>
                                <button className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:scale-105 transition">
                                    See Details
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AllServices;
