// src/api/reviewsByUserPromise.js

export const reviewsByUserPromise = (email, accessToken) => {
    return fetch(`https://echo-serve-server.vercel.app/reviews?userEmail=${email}`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
        .then(res => res.json());
};
