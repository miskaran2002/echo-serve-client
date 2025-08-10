// Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 flex items-center justify-center px-4 py-12">
            <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 max-w-lg text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Icon */}
                <motion.div
                    className="flex justify-center mb-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                    <MessageSquare size={60} className="text-sky-600" />
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-sky-700 mb-4">Get in Touch</h2>

                {/* Paragraph */}
                <p className="text-gray-600 mb-6">
                    We’d love to hear from you! Whether you have a question, feedback, or
                    need assistance, the EchoServe team is here to help.
                    Our goal is to make your experience smooth and enjoyable, so don’t
                    hesitate to reach out.
                </p>

                {/* Email */}
                <div className="flex items-center justify-center gap-3 bg-sky-50 p-4 rounded-lg shadow-sm">
                    <Mail className="text-sky-600" size={24} />
                    <a
                        href="mailto:support@echoserve.com"
                        className="text-sky-700 font-medium hover:underline"
                    >
                        support@echoserve.com
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
