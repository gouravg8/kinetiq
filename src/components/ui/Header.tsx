"use client";
import { Dumbbell, Moon, Sun } from "lucide-react";
import React, { useState } from "react";

const Header = () => {
	const [darkMode, setDarkMode] = useState(false);
	return (
		<header className="flex justify-between items-center mt-4 mb-8 mx-auto">
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 bg-yellow-500 rounded-md flex items-center justify-center">
					<Dumbbell className="text-black" size={28} />
				</div>
				<div>
					<h1 className="text-3xl font-bold">Kinetiq</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Track your fitness journey
					</p>
				</div>
			</div>
			<button
				onClick={() => setDarkMode(!darkMode)}
				className="p-2 rounded-full bg-gray-200 dark:bg-[#1C1C1E] hover:bg-gray-300 dark:hover:bg-gray-800 transition cursor-pointer"
			>
				{darkMode ? (
					<Sun size={20} className="text-yellow-500" />
				) : (
					<Moon size={20} className="text-yellow-500" />
				)}
			</button>
		</header>
	);
};

export default Header;
