import React from 'react';
import { useLoaderData } from 'react-router';

const serviceDetails = () => {
    const service = useLoaderData();
     console.log(service);
    return (
        <div>
            <h2>This is services Details page!!!</h2>
        </div>
    );
};

export default serviceDetails;