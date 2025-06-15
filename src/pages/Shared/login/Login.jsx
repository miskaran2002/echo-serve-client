import React, { use } from 'react';
import loginLottie from '../../../assets/lotties/Login.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../../../contexts/Authcontext/AuthContext';

const Login = () => {
    const { signInUser }=use(AuthContext)
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                
            })
            .catch(error => console.error(error));
       
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={{ width: '400px' }} animationData={loginLottie} loop={true}></Lottie>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl text-blue-700 font-bold">Login now!</h1>
                        <form onSubmit={handleLogin} className="form-control">
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email"
                                    name="email"
                                    className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-primary mt-4">Sign In</button>
                            </fieldset>
                        </form>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;