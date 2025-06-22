import React, { useContext } from 'react';
import Logo from '../../assets/logo.png';
import { NavLink, Link } from 'react-router';
import { FaSignInAlt } from 'react-icons/fa';
import { SiGnuprivacyguard } from 'react-icons/si';
import { CgLogOut } from 'react-icons/cg';
import { AuthContext } from '../../contexts/Authcontext/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log('Signed out successfully'))
            .catch((error) => console.log(error));
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `relative text-blue-700 text-xl font-medium transition duration-300 hover:text-blue-900 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300 ${isActive ? 'before:w-full' : 'before:w-0'}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allServices"
                    className={({ isActive }) =>
                        `relative text-blue-700 text-xl font-medium transition duration-300 hover:text-blue-900 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300 ${isActive ? 'before:w-full' : 'before:w-0'}`
                    }
                >
                    All Services
                </NavLink>
            </li>
            {
                user && (<li>
                    <NavLink
                        to="/addServices"
                        className={({ isActive }) =>
                            `relative text-blue-700 text-xl font-medium transition duration-300 hover:text-blue-900 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300 ${isActive ? 'before:w-full' : 'before:w-0'}`
                        }
                    >
                        Add Services
                    </NavLink>
                </li>)
            }
            {
                user && (<li>
                    <NavLink
                        to="/myServices"
                        className={({ isActive }) =>
                            `relative text-blue-700 text-xl font-medium transition duration-300 hover:text-blue-900 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300 ${isActive ? 'before:w-full' : 'before:w-0'}`
                        }
                    >
                        My Services
                    </NavLink>
                </li>)
            }
            {
                user && (<li>
                    <NavLink
                        to="/myReviews"
                        className={({ isActive }) =>
                            `relative text-blue-700 text-xl font-medium transition duration-300 hover:text-blue-900 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300 ${isActive ? 'before:w-full' : 'before:w-0'}`
                        }
                    >
                        My Reviews
                    </NavLink>
                </li>)
            }
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-base-100">
            <div className="navbar shadow-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="text-xl">
                        <img src={Logo} alt="EchoServe Logo" className="h-20 mx-2 rounded-xl w-auto" />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex items-center gap-4">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    {user ? (
                        <>
                            {user.photoURL && (
                                <img
                                    src={user.photoURL}
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                                    title={user.displayName || 'Profile'}
                                />
                            )}
                            <button onClick={handleSignOut} className="btn btn-success">
                                <CgLogOut className="text-lg" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className="btn btn-secondary" to="/signUp">
                                <SiGnuprivacyguard className="text-lg" /> Sign Up
                            </NavLink>
                            <NavLink className="btn btn-primary" to="/login">
                                <FaSignInAlt className="text-lg" /> Login
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
