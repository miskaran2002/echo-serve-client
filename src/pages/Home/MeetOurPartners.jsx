import { motion } from "framer-motion";

const partners = [
    {
        name: "FixIt Ltd.",
        logo: "https://i.ibb.co/4wt0htH9/pexels-amp-aphinya-3537388-5291751.jpg",
        description: "Provides skilled technicians and ensures on-demand home services for Echo Serve users.",
    },
    {
        name: "LocalMart",
        logo: "https://i.ibb.co/5NkjCf9/pexels-aperture-30714140.jpg",
        description: "Supplies tools and parts directly to service providers through an integrated supply chain.",
    },
    {
        name: "HelpHands NGO",
        logo: "https://i.ibb.co/WN20r64X/pexels-rdne-6646918.jpg",
        description: "Collaborates with Echo Serve for community support and volunteer-based emergency services.",
    },
];

const MeetOurPartners = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-[#f0faff] to-[#d2ecff]">
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ x: -80, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    Meet Our Partners
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 text-gray-600"
                >
                    Our success is powered by collaboration.
                </motion.p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
                {partners.map((partner, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border text-center"
                    >
                        <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            className="w-20 h-20 mx-auto mb-4 object-contain"
                        />
                        <h3 className="text-xl font-semibold text-blue-800">{partner.name}</h3>
                        <p className="mt-2 text-gray-600 text-sm">{partner.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default MeetOurPartners;
