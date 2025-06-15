import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router'; 
import signUpLottie from '../../../assets/lotties/SignUp.json';
import { AuthContext } from '../../../contexts/Authcontext/AuthContext';
import { updateProfile } from 'firebase/auth'; 
import Swal from 'sweetalert2';


const Signup = () => {
    const { createUser, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate(); // 

    const handleSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value;

        // Create user
        createUser(email, password)
            .then(result => {
                const user = result.user;

                // Update user profile with name and photo
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photoUrl
                });
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Signup Successful!',
                    text: 'Please login now.',
                    confirmButtonColor: '#6366f1'
                });
                // Optionally sign out and redirect to login
                return signOutUser();
            })
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Signup Failed!',
                    text: error.message,
                    confirmButtonColor: '#ef4444'
                });
                console.log(error)
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={{ width: '400px' }} animationData={signUpLottie} loop={true}></Lottie>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold text-pink-500">Signup now!</h1>
                        <form onSubmit={handleSignup} className="form-control">
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name="name" className="input" placeholder="Name" required />

                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" required />

                                <label className="label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" required />

                                <label className="label">Photo Url</label>
                                <input type="text" name="photoUrl" className="input" placeholder="Photo URL" />

                                <div><a className="link link-hover text-red-600">Forgot password?</a></div>

                                <p className="text-sm text-center text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-orange-500 font-medium hover:underline">
                                        Login
                                    </Link>
                                </p>

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
