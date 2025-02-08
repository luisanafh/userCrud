// src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';
import useCrudApi from './hooks/useCrudApi';
import UserCard from './components/userCard';
import UserModal from './components/UserModal';
import Header from './components/Header';
import './components/Header.css';

const baseUrl = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/';

function App() {
	const { data: users, pending, error, request } = useCrudApi();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userToEdit, setUserToEdit] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			await request({ url: baseUrl + 'users' });
		};

		fetchData();
	}, []);

	const addUser = (user) => {
		request({ url: baseUrl + 'users', method: 'POST', body: user });
	};

	const updateUser = (user) => {
		request({ url: baseUrl + `users/${user.id}`, method: 'PUT', body: user });
		setUserToEdit(null);
	};

	const remove = (id) => {
		request({
			url: baseUrl + `users/${id}`,
			method: 'DELETE',
			id,
		});
	};

	const handleEdit = (user) => {
		setUserToEdit(user);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setUserToEdit(null);
		setIsModalOpen(false);
	};

	return (
		<div>
			{error && <p>Error: {error}</p>}
			<Header onAddUser={() => setIsModalOpen(true)} />
			<UserCard
				users={users}
				pending={pending}
				remove={remove}
				onAddUser={() => setIsModalOpen(true)}
				edit={handleEdit}
			/>
			<UserModal
				isOpen={isModalOpen}
				onClose={handleModalClose}
				onSave={userToEdit ? updateUser : addUser}
				userToEdit={userToEdit}
			/>
		</div>
	);
}

export default App;
