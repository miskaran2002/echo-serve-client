export const servicesCreatedByPromise = (email, accessToken) => {
    return fetch(`https://echo-serve-server.vercel.app/services?email=${email}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(res => res.json())
}