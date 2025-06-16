import React, { useEffect, useState } from 'react';

const FeaturedServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/services?limit=6')

            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading featured services...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center text-red-500 mb-4">Featured Services</h2>
            <p className="text-center font-semibold text-lg text-gray-600">Let's Explore our Services Now!! & Find your choice--? </p>
            <div className="grid grid-cols-1 md:grid-cols-3 ml-2 mr-2gap-4">
                {services.map(service => (
                    <div key={service._id} className=" p-2 m-2 border border-amber-300  rounded-2xl shadow">
                        <img
                            src={service.serviceImage}
                            alt={service.serviceTitle}
                            className="h-40 object-cover w-full mb-2"
                        />
                        <h3 className="text-lg font-semibold">{service.serviceTitle}</h3>
                        <p>{service.companyName}</p>
                        <p className="text-sm">{service.description.slice(0, 100)}...</p>
                        <p className="font-bold">${service.price}</p>
                        <button
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => {
                                // Add navigation to details page or handle click here
                                // For example:
                                window.location.href = `/services/${service._id}`;
                            }}
                        >
                            See Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedServices;
