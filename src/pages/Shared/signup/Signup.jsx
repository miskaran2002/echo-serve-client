import Lottie from 'lottie-react';
import React from 'react';
import signUpLottie from '../../../assets/lotties/SignUp.json'

const Signup = () => {
    const handleSignup= (e) => {
        e.preventDefault()
        const form=e.target;
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        const user={name,email,password}
        console.log(user)

       

        
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={{width :'400px'}} animationData={signUpLottie} loop={true}></Lottie>
                </div>
               
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold text-pink-500">Signup now!</h1>
                        <form onSubmit={handleSignup}  className="form-control">
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text"
                                    name="name"
                                    className="input" placeholder="Name" />
                                <label className="label">Email</label>

                                <input type="email"
                                    name="email"
                                    className="input" placeholder="Email" />

                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />
                                
                                
                                <label className="label">Photo Url</label>
                                <input type="text" name='photoUrl' className="input" placeholder="photoUrl" />

                                <div><a className="link link-hover text-red-600">Forgot password?</a></div>
                                <button className="btn btn-secondary mt-4">Signup</button>
                            </fieldset>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;