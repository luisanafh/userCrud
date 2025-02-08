import React from 'react';
import './Header.css';

const Header = ({ onAddUser }) => {
	return (
		<header className="bg-gradient-to-b from-gray-500 to-gray-400 text-white shadow-lg p-4 flex flex-col items-center mx-5 mt-5 mb-5 rounded-lg">
			<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold typing-animation mb-4">
				USER CRUD
			</h1>
			<button
				onClick={onAddUser}
				className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 mt-4 mb-4"
			>
				Create user
			</button>
		</header>
	);
};

export default Header;
