import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const pages = [...Array(totalPages).keys()].map((num) => num + 1);
	return (
		<div className="flex flex-col items-center justify-between px-4 py-3 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="relative inline-flex items-center rounded-md border border-gray-300 bg-green-500 text-white px-4 py-2 text-sm font-medium hover:bg-green-700"
				>
					Previous
				</button>
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-green-500 text-white px-4 py-2 text-sm font-medium hover:bg-green-700"
				>
					Next
				</button>
			</div>
			<div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-between">
				<div className="flex space-x-2">
					<button
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						<span className="sr-only">Previous</span>
						<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
					</button>
					{pages.map((page) => (
						<button
							key={page}
							onClick={() => onPageChange(page)}
							className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
								page === currentPage
									? 'z-10 bg-green-500 text-white'
									: 'text-gray-900 bg-white'
							} ring-1 ring-inset ring-gray-300 hover:bg-green-700 focus:z-20 focus:outline-offset-0`}
						>
							{page}
						</button>
					))}
					<button
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						<span className="sr-only">Next</span>
						<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
				<div className="mt-2">
					<p className="text-sm text-gray-700">
						Página <span className="font-medium">{currentPage}</span> de{' '}
						<span className="font-medium">{totalPages}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
