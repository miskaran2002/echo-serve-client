import React from 'react';

import { reviewsByUserPromise } from '../api/reviewsApi';
import useAuth from '../hook/useAuth';
import ReviewsList from './ReviewsList';

const MyReviews = () => {
    const { user } = useAuth();
    console.log('token in the context', user.accessToken);

    // Pass a function that returns the promise, not the promise itself
    const getReviews = () => reviewsByUserPromise(user.email, user.accessToken);
    

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

            <ReviewsList reviewsByUserPromise={getReviews}></ReviewsList>
        </div>
    );
};

export default MyReviews;
