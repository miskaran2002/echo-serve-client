// src/api/reviewsByUserPromise.js

export const reviewsByUserPromise = (email,accessToken) => {
    return fetch(`http://localhost:3000/reviews?userEmail=${email}`,{
      headers: {
          authorization:`Bearer ${accessToken}`
       }
    })
        .then(res => res.json());
};
