import React, { useContext } from 'react';
import loginLottie from '../../../assets/lotties/Login.json';
import Lottie from 'lottie-react';
import { AuthContext } from '../../../contexts/Authcontext/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import { motion } from 'framer-motion';

const Login = () => {
    const { signInUser } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                navigate(from);
            })
            .catch(error => console.error(error));
    };

    return (
        <motion.div
            className="hero bg-blue-200 min-h-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            <div className="hero-content flex-col lg:flex-row-reverse">
                {/* Lottie Animation */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center lg:text-left"
                >
                    <Lottie style={{ width: '400px' }} animationData={loginLottie} loop={true} />
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
                >
                    <div className="card-body">
                        <h1 className="text-5xl text-blue-700 font-bold">Login now!</h1>
                        <form onSubmit={handleLogin} className="form-control">
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="input input-bordered"
                                    placeholder="Email"
                                />
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="input input-bordered"
                                    placeholder="Password"
                                />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-primary mt-4">Sign In</button>
                            </fieldset>
                        </form>

                        {/* Social Login */}
                        <SocialLogin from={from} />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Login;
