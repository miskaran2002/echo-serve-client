 export  const servicesCreatedByPromise = (email,accessToken) => {
    return fetch(`http://localhost:3000/services?email=${email}`,{
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    .then(res => res.json())
}