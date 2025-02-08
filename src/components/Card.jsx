import React, { useState } from 'react';
import Pagination from './Pagination';
import './Loading.css';
import Empty from './Empty';

const Card = ({ users, pending, remove, edit, onAddUser }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 9;

	const totalPages = Math.ceil(users.length / usersPerPage);

	const startIndex = (currentPage - 1) * usersPerPage;
	const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);

	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className="bg-gray-300 p-5 mx-5 my-5 rounded-lg">
			{pending ? (
				<div className="flex flex-col items-center justify-center h-126">
					<div className="p-6 rounded-lg mx-5">
						<p className="text-4xl font-bold text-gray-700 flex items-center">
							LOADING
							<span className="dot-ellipsis ml-2"></span>
						</p>
					</div>
				</div>
			) : (
				<>
					{users.length === 0 ? (
						<Empty onAddUser={onAddUser} />
					) : (
						<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{selectedUsers.map((user) => (
								<li
									key={user.id}
									className="bg-gray-500 rounded-lg shadow-2xl p-4"
								>
									<div className="flex flex-wrap items-center mb-4">
										<img
											src={user.image_url}
											alt=""
											className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full shadow-lg mr-4"
										/>
										<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 break-words">
											{user.first_name} {user.last_name}
										</h3>
									</div>
									<div className="text-center text-gray-200">
										<p className="text-sm sm:text-base md:text-lg lg:text-xl break-words">
											{user.email}
										</p>
										<p className="text-sm sm:text-base md:text-lg lg:text-xl break-words">
											{formatDate(user.birthday)}
										</p>
									</div>
									<div className="flex justify-center mt-4 space-x-2">
										<button
											className="py-1 px-3 bg-orange-500 text-white rounded-md hover:bg-orange-700 shadow-md"
											onClick={() => edit(user)}
										>
											Edit
										</button>
										<button
											className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-700 shadow-md"
											onClick={() => remove(user.id)}
										>
											Delete
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Card;
