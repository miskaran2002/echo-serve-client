import { motion } from "framer-motion";

const steps = [
    {
        title: "Discover Services",
        desc: "Browse categories or search for specific services available in your area.",
    },
    {
        title: "Connect Instantly",
        desc: "Chat or book appointments with service providers in real time.",
    },
    {
        title: "Rate & Review",
        desc: "Share your experience to help others and improve the platform.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-[#f0f9ff] to-[#e0f7fa]">
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    How Echo Serve Works
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 text-gray-600"
                >
                    Simple steps to get the help you need, quickly and easily.
                </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.3 }}
                        className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl"
                    >
                        <h3 className="text-xl font-semibold text-blue-700 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
