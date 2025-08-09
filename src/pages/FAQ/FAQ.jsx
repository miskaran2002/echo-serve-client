import React, { useState } from "react";

const faqs = [
    {
        question: "What is Echo Serve?",
        answer:
            "Echo Serve is a full-stack parcel delivery and service review platform built with React, Node.js, MongoDB, and Firebase Authentication.",
    },
    {
        question: "How do I create an account?",
        answer:
            "You can register using your email and password or use Google social login for quick sign-in.",
    },
    {
        question: "Can I track my parcel?",
        answer:
            "Yes, Echo Serve provides a tracking system where you can enter your tracking ID and get real-time updates.",
    },
    {
        question: "How to assign a rider to a parcel?",
        answer:
            "Admin can assign riders via the dashboard to parcels that have been paid but not yet collected.",
    },
    {
        question: "Is my data secure?",
        answer:
            "Absolutely! We use Firebase Authentication and JWT tokens to protect your data and secure our APIs.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-16 p-6">
            <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg shadow-sm"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                        >
                            <span className="font-semibold text-lg">{faq.question}</span>
                            <span className="text-2xl text-blue-600">
                                {openIndex === index ? "-" : "+"}
                            </span>
                        </button>

                        {openIndex === index && (
                            <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
