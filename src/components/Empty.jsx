import React from 'react';

export default function Empty({ onAddUser }) {
	return (
		<>
			<main className="grid min-h-full place-items-center bg-gray-300 px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-base font-semibold text-green-600">
						There are no users
					</p>
					<h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
						Empty List
					</h1>
					<p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
						It seems that there are no registered users. Create one to get
						started!
					</p>
					<div className="mt-10 flex items-center justify-center">
						<button
							onClick={onAddUser}
							className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
						>
							Create the first user <span aria-hidden="true">&rarr;</span>
						</button>
					</div>
				</div>
			</main>
		</>
	);
}
