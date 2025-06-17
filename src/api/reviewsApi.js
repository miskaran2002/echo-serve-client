// src/api/reviewsByUserPromise.js

export const reviewsByUserPromise = (email) => {
    return fetch(`http://localhost:3000/reviews?userEmail=${email}`)
        .then(res => res.json());
};
