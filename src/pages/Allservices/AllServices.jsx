import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAuth from '../../hook/useAuth';

const AllServices = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const fixedCategories = [
        'Web Development',
        'Design',
        'Digital Marketing',
        'Writing',
        'Consulting',
        'Others',
    ];

    useEffect(() => {
        const fetchServices = async () => {
            try {
                let url = 'https://echo-serve-server.vercel.app/allServices';
                let headers = {};

                if (user && user.getIdToken) {
                    const token = await user.getIdToken();
                    headers.authorization = `Bearer ${token}`;
                }

                const res = await fetch(url, { headers });
                const data = await res.json();

                if (Array.isArray(data)) {
                    setServices(data);
                } else if (data?.message === 'unauthorized access') {
                    console.warn('Unauthorized access detected. Showing empty services.');
                    setServices([]);
                } else {
                    console.error('Unexpected data structure:', data);
                    setServices([]);
                }
            } catch (error) {
                console.error('Error loading services:', error);
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [user]);

    useEffect(() => {
        filterAndSearch();
    }, [searchTerm, selectedCategory, services]);

    const handleCategorySelect = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filterAndSearch = () => {
        let filtered = [...services];

        if (selectedCategory) {
            filtered = filtered.filter((service) => {
                if (!service.category || typeof service.category !== 'string') return false;
                if (fixedCategories.includes(service.category)) {
                    return service.category === selectedCategory;
                } else {
                    return selectedCategory === 'Others';
                }
            });
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (service) =>
                    service.serviceTitle?.toLowerCase().includes(term) ||
                    (typeof service.category === 'string' &&
                        service.category.toLowerCase().includes(term)) ||
                    service.companyName?.toLowerCase().includes(term)
            );
        }

        setFilteredServices(filtered);
    };

    if (loading) {
        return <div className="text-center py-10 text-xl">Loading all services...</div>;
    }

    return (
        <div className="px-4 md:px-10 py-8">
            <h2 className="text-3xl font-bold text-yellow-500 text-center mb-8">All Services</h2>

            {/* Search & Category Filter */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title, category, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full md:w-1/2"
                />

                <select
                    value={selectedCategory}
                    onChange={handleCategorySelect}
                    className="select select-bordered w-full md:w-1/4"
                >
                    <option value="">All Categories</option>
                    {fixedCategories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* No data message */}
            {filteredServices.length === 0 ? (
                <div className="text-center text-red-500 text-lg font-medium py-10">
                    No services found for this category or search term.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => (
                        <motion.div
                            key={service._id}
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
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
                                <p className="text-sm text-gray-600">{service.description?.slice(0, 100)}...</p>
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
            )}
        </div>
    );
};

export default AllServices;
