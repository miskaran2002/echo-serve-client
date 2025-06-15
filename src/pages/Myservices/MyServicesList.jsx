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
                fetch(`http://localhost:3000/services/${id}`, {
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

        fetch(`http://localhost:3000/services/${selectedService._id}`, {
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
            <h2 className='text-3xl font-bold mb-4'>Services created by you: {services.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service._id}>
                                <td>{service.serviceTitle}</td>
                                <td>{service.category}</td>
                                <td>${service.price}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm btn-info" onClick={() => openEditModal(service)}>
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(service._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center"
                >
                    <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <Dialog.Title className="text-xl font-bold mb-4">Update Service</Dialog.Title>
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-3">
                            <input name="serviceImage" defaultValue={selectedService.serviceImage} className="input input-bordered" placeholder="Image URL" required />
                            <input name="serviceTitle" defaultValue={selectedService.serviceTitle} className="input input-bordered" placeholder="Title" required />
                            <input name="companyName" defaultValue={selectedService.companyName} className="input input-bordered" placeholder="Company" required />
                            <input name="website" defaultValue={selectedService.website} className="input input-bordered" placeholder="Website" required />
                            <input name="category" defaultValue={selectedService.category} className="input input-bordered" placeholder="Category" required />
                            <input type="number" name="price" defaultValue={selectedService.price} className="input input-bordered" placeholder="Price" required />
                            <textarea name="description" defaultValue={selectedService.description} className="textarea textarea-bordered" placeholder="Description" required></textarea>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </Dialog.Panel>
                </Dialog>
            )}
        </div>
    );
};

export default MyServicesList;
