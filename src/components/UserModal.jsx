import React, { useState, useEffect } from 'react';
import { z } from 'zod';

const userSchema = z.object({
	first_name: z.string().min(1, 'El nombre es requerido'),
	last_name: z.string().min(1, 'El apellido es requerido'),
	email: z.string().email('Correo electrónico no válido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
	birthday: z.string(),
	image_url: z.string().url('URL de imagen no válida'),
});

const UserModal = ({ isOpen, onClose, onSave, userToEdit }) => {
	const [values, setValues] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		birthday: '',
		image_url: '',
	});

	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (userToEdit) {
			setValues({
				...userToEdit,
				birthday: userToEdit.birthday.split('T')[0],
			});
		} else {
			setValues({
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				birthday: '',
				image_url: '',
			});
		}
	}, [userToEdit]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			userSchema.parse(values);
			if (userToEdit) {
				onSave({ ...values, id: userToEdit.id });
			} else {
				onSave(values);
			}
			setValues({
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				birthday: '',
				image_url: '',
			});
			onClose();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors = error.errors.reduce((acc, err) => {
					acc[err.path[0]] = err.message;
					return acc;
				}, {});
				setErrors(fieldErrors);
			}
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
				<h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							First Name
						</label>
						<input
							type="text"
							name="first_name"
							value={values.first_name}
							onChange={handleChange}
							className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-lg focus:ring-black focus:border-black"
						/>
						{errors.first_name && (
							<p className="text-red-500 text-sm">{errors.first_name}</p>
						)}
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Last Name
						</label>
						<input
							type="text"
							name="last_name"
							value={values.last_name}
							onChange={handleChange}
							className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-lg focus:ring-black focus:border-black"
						/>
						{errors.last_name && (
							<p className="text-red-500 text-sm">{errors.last_name}</p>
						)}
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={values.email}
							onChange={handleChange}
							className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-lg focus:ring-black focus:border-black"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email}</p>
						)}
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-lg focus:ring-black focus:border-black"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password}</p>
						)}
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Birthday
						</label>
						<input
							type="date"
							name="birthday"
							value={values.birthday}
							onChange={handleChange}
							className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-lg focus:ring-black focus:border-black"
						/>
						{errors.birthday && (
							<p className="text-red-500 text-sm">{errors.birthday}</p>
						)}
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Image URL
						</label>
						<input
							type="text"
							name="image_url"
							value={values.image_url}
							onChange={handleChange}
							className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-lg focus:ring-black focus:border-black"
						/>
						{errors.image_url && (
							<p className="text-red-500 text-sm">{errors.image_url}</p>
						)}
					</div>
					<div className="flex justify-center space-x-4">
						<button
							type="button"
							onClick={onClose}
							className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserModal;
