import React, { use, useState } from 'react';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

const MyServicesList = ({ servicesCreatedByPromise }) => {
    const services = use(servicesCreatedByPromise);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://echo-serve-server.vercel.app/services/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Service has been deleted.', 'success');
                            window.location.reload();
                        }
                    });
            }
        });
    };

    const openEditModal = (service) => {
        setSelectedService(service);
        setIsOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedService = {
            serviceImage: form.serviceImage.value,
            serviceTitle: form.serviceTitle.value,
            companyName: form.companyName.value,
            website: form.website.value,
            description: form.description.value,
            category: form.category.value,
            price: parseFloat(form.price.value)
        };

        fetch(`https://echo-serve-server.vercel.app/services/${selectedService._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedService)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Updated!', 'Service has been updated.', 'success');
                    setIsOpen(false);
                    window.location.reload();
                }
            });
    };

    return (
        <div className="p-4">
            <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                Services created by you: {services.length}
            </h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <table className="table w-full text-gray-900 dark:text-gray-100">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            <th className="py-3 px-4 text-left">Logo</th>
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                                <td className="py-3 px-4">
                                    <img
                                        src={service.serviceImage}
                                        alt={service.serviceTitle}
                                        className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                    />
                                </td>
                                <td className="py-3 px-4 font-semibold">{service.serviceTitle}</td>
                                <td className="py-3 px-4">{service.category}</td>
                                <td className="py-3 px-4 text-green-600 font-medium">${service.price}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button
                                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                                        onClick={() => openEditModal(service)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                                        onClick={() => handleDelete(service._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {services.map(service => (
                    <div
                        key={service._id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col gap-2 text-gray-900 dark:text-gray-100"
                    >
                        <img
                            src={service.serviceImage}
                            alt={service.serviceTitle}
                            className="w-full h-40 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                        <h3 className="text-lg font-semibold">{service.serviceTitle}</h3>
                        <p>{service.category}</p>
                        <p className="text-green-600 font-medium">${service.price}</p>
                        <div className="flex flex-col gap-2 mt-2">
                            <button
                                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white w-full"
                                onClick={() => openEditModal(service)}
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white w-full"
                                onClick={() => handleDelete(service._id)}
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="fixed inset-0 z-50 bg-black bg-opacity-40 dark:bg-opacity-80 flex items-center justify-center"
                >
                    <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto text-gray-900 dark:text-gray-100">
                        <Dialog.Title className="text-xl font-bold mb-4">Update Service</Dialog.Title>
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-3">
                            <input
                                name="serviceImage"
                                defaultValue={selectedService.serviceImage}
                                className="input input-bordered bg-white dark:bg-gray-800 dark:text-gray-100"
                                placeholder="Image URL"
                                required
                            />
                            <input
                                name="serviceTitle"
                                defaultValue={selectedService.serviceTitle}
                                className="input input-bordered bg-white dark:bg-gray-800 dark:text-gray-100"
                                placeholder="Title"
                                required
                            />
                            <input
                                name="companyName"
                                defaultValue={selectedService.companyName}
                                className="input input-bordered bg-white dark:bg-gray-800 dark:text-gray-100"
                                placeholder="Company"
                                required
                            />
                            <input
                                name="website"
                                defaultValue={selectedService.website}
                                className="input input-bordered bg-white dark:bg-gray-800 dark:text-gray-100"
                                placeholder="Website"
                                required
                            />
                            <input
                                name="category"
                                defaultValue={selectedService.category}
                                className="input input-bordered bg-white dark:bg-gray-800 dark:text-gray-100"
                                placeholder="Category"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                defaultValue={selectedService.price}
                                className="input input-bordered bg-white dark:bg-gray-800 dark:text-gray-100"
                                placeholder="Price"
                                required
                            />
                            <textarea
                                name="description"
                                defaultValue={selectedService.description}
                                className="textarea textarea-bordered bg-white dark:bg-gray-800 dark:text-gray-100"
                                placeholder="Description"
                                required
                            ></textarea>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </form>
                    </Dialog.Panel>
                </Dialog>
            )}
        </div>
    );
};

export default MyServicesList;
