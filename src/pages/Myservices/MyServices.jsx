import React, { Suspense } from 'react';
import useAuth from '../../hook/useAuth';
import MyServicesList from './MyServicesList';
import { servicesCreatedByPromise } from '../../api/servicsApi';

const MyServices = () => {
    const {user}=useAuth();
    return (
        <div>
            <h2 className='text-3xl text-center font-bold mt-5 text-pink-600'>My posted Services</h2>

            <Suspense>
                <MyServicesList servicesCreatedByPromise={servicesCreatedByPromise(user.email)}></MyServicesList>
            </Suspense>
        </div>
    );
};

export default MyServices;