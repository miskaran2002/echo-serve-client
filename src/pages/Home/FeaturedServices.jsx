import React, { useEffect, useState } from 'react';

const FeaturedServices = () => {
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
                console.error('Error fetching services:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading featured services...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Featured Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map(service => (
                    <div key={service._id} className="p-4 border rounded shadow">
                        <img src={service.serviceImage} alt={service.serviceTitle} className="h-40 object-cover w-full mb-2" />
                        <h3 className="text-lg font-semibold">{service.serviceTitle}</h3>
                        <p>{service.companyName}</p>
                        <p className="text-sm">{service.description.slice(0, 100)}...</p>
                        <p className="font-bold">${service.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedServices;
