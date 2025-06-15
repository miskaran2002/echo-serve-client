import React from "react";
import { motion } from "framer-motion";
import Logo from '../../assets/logo.png'; 

const Footer = () => {
    return (
        <motion.footer
            initial={{ rotateX: 75, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white p-10"
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl flex items-center font-bold mb-2">
                        <img src={Logo} className="h-15 mx-2 rounded-xl w-auto" alt="" />
                        EchoServe
                        </h2>
                    <p className="text-sm">
                        Connecting voices to services. Explore, review, and grow with trust.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">Useful Links</h3>
                    <ul className="space-y-1">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/allServices" className="hover:underline"> AllServices</a></li>
                        <li><a href="/addServices" className="hover:underline">Add Service</a></li>
                        <li><a href="/myServices" className="hover:underline">My Services</a></li>
                        <li><a href="/myReviews" className="hover:underline">My Reviews</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                    <form className="flex flex-col space-y-2">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="p-2 rounded text-black"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="p-2 rounded text-black"
                        />
                        <textarea
                            rows="3"
                            placeholder="Your Message"
                            className="p-2 rounded text-black"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-white text-purple-700 font-semibold py-2 px-4 rounded hover:bg-purple-100 transition"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <div className="text-center mt-10 border-t pt-4 border-white/20 text-sm">
                &copy; {new Date().getFullYear()} EchoServe. All rights reserved.
            </div>
        </motion.footer>
    );
};

export default Footer;
