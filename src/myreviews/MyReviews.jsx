import React, { useContext, useEffect, useState } from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from '../contexts/Authcontext/AuthContext';

const MySwal = withReactContent(Swal);

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);

    // Load user's reviews
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/reviews?userEmail=${user.email}`)
                .then(res => res.json())
                .then(data => setReviews(data));
        }
    }, [user]);

    // Handle delete
    const handleDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this review?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/reviews/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setReviews(prev => prev.filter(r => r._id !== id));
                            MySwal.fire('Deleted!', 'Your review has been deleted.', 'success');
                        }
                    });
            }
        });
    };

    // Handle update submit
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const text = form.text.value;
        const rating = parseInt(form.rating.value);

        fetch(`http://localhost:3000/reviews/${editingReview._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, rating })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const updated = reviews.map(r =>
                        r._id === editingReview._id ? { ...r, text, rating } : r
                    );
                    setReviews(updated);
                    setEditingReview(null);

                    // Show success alert
                    MySwal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: 'Your review has been updated successfully.',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">My Reviews ({reviews.length})</h2>

            {reviews.map(review => (
                <div key={review._id} className="bg-white rounded-xl shadow p-4 mb-4">
                    <h3 className="text-xl font-semibold mb-1">{review.serviceTitle}</h3>
                    <Rating
                        initialRating={review.rating}
                        readonly
                        emptySymbol={<FaRegStar className="text-yellow-500" />}
                        fullSymbol={<FaStar className="text-yellow-500" />}
                    />
                    <p className="mt-2">{review.text}</p>
                    <div className="mt-4 flex gap-4">
                        <button onClick={() => setEditingReview(review)} className="btn btn-sm btn-primary">Update</button>
                        <button onClick={() => handleDelete(review._id)} className="btn btn-sm btn-error">Delete</button>
                    </div>
                </div>
            ))}

            {/* Update Modal */}
            {editingReview && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Update Review</h2>
                        <form onSubmit={handleUpdate} className="space-y-4 text-left">
                            <label className="block">
                                <span className="text-gray-600">Service Title:</span>
                                <input
                                    type="text"
                                    value={editingReview.serviceTitle}
                                    readOnly
                                    className="input input-bordered w-full mt-1"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-600">Review:</span>
                                <textarea
                                    name="text"
                                    defaultValue={editingReview.text}
                                    className="textarea textarea-bordered w-full mt-1"
                                    required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-600">Rating:</span>
                                <input
                                    name="rating"
                                    type="number"
                                    defaultValue={editingReview.rating}
                                    min="1"
                                    max="5"
                                    className="input input-bordered w-full mt-1"
                                    required
                                />
                            </label>
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingReview(null)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
