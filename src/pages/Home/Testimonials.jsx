import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Amina Rahman",
        feedback: "Echo Serve helped me find a trusted plumber quickly. Super easy and reliable!",
        role: "Verified User",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        name: "Sabbir Hossain",
        feedback: "Amazing platform! Booking appointments and chatting with providers was seamless.",
        role: "Happy Customer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Nadia Islam",
        feedback: "I love how fast and responsive the service providers are here.",
        role: "Frequent User",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-[#d7f8ff] to-[#a0e9ff]">
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-blue-900"
                >
                    What Our Users Say
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 text-blue-700"
                >
                    Trusted by thousands of users worldwide.
                </motion.p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
                {testimonials.map(({ name, feedback, role, avatar }, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 60, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.4 }}
                        className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg flex flex-col items-center text-center"
                    >
                        <img
                            src={avatar}
                            alt={`${name} avatar`}
                            className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-blue-300"
                        />
                        <p className="text-gray-800 italic mb-4">"{feedback}"</p>
                        <h3 className="text-lg font-semibold text-blue-900">{name}</h3>
                        <p className="text-sm text-blue-600">{role}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
