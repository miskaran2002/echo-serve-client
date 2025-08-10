import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAuth from '../../hook/useAuth';
import Loader from '../Loading/Loader';

const AllServices = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;

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
                } else {
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
    }, [searchTerm, selectedCategory, services, sortOrder]);

    const handleCategorySelect = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
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
                    (typeof service.category === 'string' && service.category.toLowerCase().includes(term)) ||
                    service.companyName?.toLowerCase().includes(term)
            );
        }

        if (sortOrder === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredServices(filtered);
    };

    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="px-4 md:px-10 py-8 bg-base-100 text-base-content min-h-screen">
            <h2 className="text-3xl font-bold text-yellow-500 text-center mb-8">All Services</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/4 bg-base-200 rounded-lg shadow-lg p-4 space-y-4 lg:h-[1000px]">
                    <h3 className="text-lg font-bold text-blue-700 border-b pb-2">Filter Services</h3>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by title, category, or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full"
                        aria-label="Search services"
                    />

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={handleCategorySelect}
                        className="select select-bordered w-full"
                        aria-label="Select category filter"
                    >
                        <option value="">All Categories</option>
                        {fixedCategories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* Sort Filter */}
                    <select
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="select select-bordered w-full"
                        aria-label="Select sort order"
                    >
                        <option value="">Sort by Price</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Right Content - Services */}
                <div className="w-full md:w-3/4">
                    {filteredServices.length === 0 ? (
                        <div className="text-center text-error text-lg font-medium py-10">
                            No services found for this category or search term.
                        </div>
                    ) : (
                        <>
                            {/* Services Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {currentServices.map((service, index) => (
                                    <motion.div
                                        key={service._id}
                                        className="bg-base-100 rounded-2xl shadow-2xl flex flex-col h-full"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <img
                                            src={service.serviceImage}
                                            alt={service.serviceTitle}
                                            className="w-full h-48 object-cover rounded-t-2xl"
                                        />
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3
                                                className="text-xl font-semibold truncate"
                                                title={service.serviceTitle}
                                                aria-label={`Service title: ${service.serviceTitle}`}
                                            >
                                                {service.serviceTitle}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-300 flex-grow">
                                                {service.description?.length > 100
                                                    ? `${service.description.slice(0, 100)}...`
                                                    : service.description}
                                            </p>
                                            <div className="mt-2">
                                                <span className="badge badge-info mr-2">{service.category}</span>
                                            </div>
                                            <div className="text-lg font-bold text-success mt-2">${service.price}</div>
                                            <Link to={`/services/${service._id}`} className="mt-auto">
                                                <button className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:scale-105 transition w-full">
                                                    See Details
                                                </button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6 space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="btn btn-primary"
                                        aria-label="Previous page"
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`}
                                            aria-current={currentPage === i + 1 ? 'page' : undefined}
                                            aria-label={`Page ${i + 1}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="btn btn-primary"
                                        aria-label="Next page"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllServices;
