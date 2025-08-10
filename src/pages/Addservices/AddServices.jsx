import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Authcontext/AuthContext';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const categoriesList = [
    'Web Development',
    'Design',
    'Digital Marketing',
    'Writing',
    'Consulting',
    'Others'
];

const AddServices = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        serviceImage: '',
        serviceTitle: '',
        companyName: '',
        website: '',
        description: '',
        category: [],
        price: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = e => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const newCategories = checked
                ? [...prev.category, value]
                : prev.category.filter(cat => cat !== value);
            return { ...prev, category: newCategories };
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Basic validation for categories
        if (formData.category.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Please select at least one category',
            });
            return;
        }

        const service = {
            ...formData,
            price: parseFloat(formData.price),
            addedDate: new Date().toISOString(),
            userEmail: user?.email
        };

        fetch('https://echo-serve-server.vercel.app/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(service)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Service added successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    });
                    setFormData({
                        serviceImage: '',
                        serviceTitle: '',
                        companyName: '',
                        website: '',
                        description: '',
                        category: [],
                        price: ''
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to add service.',
                        icon: 'error',
                        confirmButtonColor: '#d33'
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    title: 'Server Error!',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            });
    };

    return (
        <motion.div
            className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Add New Service</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="serviceImage"
                    value={formData.serviceImage}
                    onChange={handleChange}
                    placeholder="Service Image URL"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="serviceTitle"
                    value={formData.serviceTitle}
                    onChange={handleChange}
                    placeholder="Service Title"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Company Website"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    required
                    className="input input-bordered w-full"
                />

                {/* Category checkboxes */}
                <div className="md:col-span-2">
                    <p className="mb-2 font-semibold text-gray-700">Select Categories:</p>
                    <div className="flex flex-wrap gap-4">
                        {categoriesList.map(cat => (
                            <label key={cat} className="flex items-center gap-2 text-gray-800 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={cat}
                                    checked={formData.category.includes(cat)}
                                    onChange={handleCategoryChange}
                                    className="checkbox"
                                />
                                <span className="text-sm">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows="4"
                    required
                    className="textarea textarea-bordered md:col-span-2"
                />
                <button type="submit" className="btn btn-primary md:col-span-2">
                    Submit Service
                </button>
            </form>
        </motion.div>
    );
};

export default AddServices;
