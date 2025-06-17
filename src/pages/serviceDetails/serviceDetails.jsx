import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../contexts/Authcontext/AuthContext';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);

    // Fetch reviews for this service
    useEffect(() => {
        fetch(`https://echo-serve-server.vercel.app/reviews?serviceId=${service._id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to load reviews!',
                    text: 'Please check your internet or try again later.',
                });
            });
    }, [service._id]);

    const handleSubmitReview = () => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Logged In!',
                text: 'You must be logged in to submit a review.',
            });
            return;
        }

        if (!newReview.trim() || rating === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Incomplete!',
                text: 'Please write a review and provide a rating.',
            });
            return;
        }

        const reviewData = {
            serviceId: service._id,
            serviceTitle: service.serviceTitle,
            userEmail: user.email,
            userName: user.displayName,
            userPhoto: user.photoURL,
            rating,
            text: newReview,
            date: new Date().toISOString()
        };

        fetch('https://echo-serve-server.vercel.app/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Review Submitted!',
                        text: 'Your review has been added successfully.',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    setReviews(prev => [...prev, reviewData]);
                    setNewReview('');
                    setRating(0);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Submission Failed!',
                        text: 'Something went wrong. Please try again.',
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error!',
                    text: 'Could not submit review. Please try again later.',
                });
            });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Service Info */}
            <div className="shadow-xl rounded-xl p-6 bg-white">
                <img src={service.serviceImage} alt={service.serviceTitle} className="rounded-xl w-full h-[300px] object-cover" />
                <h2 className="text-3xl font-bold mt-4">{service.serviceTitle}</h2>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <div className="mt-4 space-y-2">
                    <p><strong>Company:</strong> {service.companyName}</p>
                    <p><strong>Website:</strong> <a href={service.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">{service.website}</a></p>
                    <p><strong>Category:</strong> {service.category}</p>
                    <p><strong>Price:</strong> ${service.price}</p>
                    <p><strong>Added Date:</strong> {new Date(service.addedDate).toLocaleString()}</p>
                </div>
            </div>

            {/* Review Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-2">Total Reviews: {reviews.length}</h3>

                {/* Review Form */}
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-lg mb-2">Add Your Review</h4>
                    <textarea
                        className="w-full h-24 p-2 rounded-md border"
                        placeholder="Write your review here..."
                        value={newReview}
                        onChange={e => setNewReview(e.target.value)}
                    />
                    <div className="flex items-center gap-4 mt-3">
                        <span className="font-semibold">Rating:</span>
                        <Rating
                            initialRating={rating}
                            emptySymbol={<FaRegStar className="text-yellow-500 text-xl" />}
                            fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                            onChange={rate => setRating(rate)}
                        />
                        <button onClick={handleSubmitReview} className="btn btn-primary ml-auto">Submit</button>
                    </div>
                </div>

                {/* Reviews Display */}
                <div className="space-y-4">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="bg-white p-4 shadow rounded-md">
                            <div className="flex items-center gap-3">
                                <img src={review.userPhoto || 'https://i.ibb.co/2t4D2YH/avatar.png'} alt="user" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{review.userName}</p>
                                    <p className="text-xs text-gray-400">{new Date(review.date).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Rating
                                    initialRating={review.rating}
                                    readonly
                                    emptySymbol={<FaRegStar className="text-yellow-500" />}
                                    fullSymbol={<FaStar className="text-yellow-500" />}
                                />
                            </div>
                            <p className="mt-2">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
