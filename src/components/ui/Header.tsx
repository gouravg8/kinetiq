"use client";
import { BarChart2, Dumbbell, Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { Segmented } from "antd";
import { useSetAtom } from "jotai";
import { timeAtom } from "@/Jotai/timeState";

const Header = () => {
	const [darkMode, setDarkMode] = useState(false);
	const setTimeState = useSetAtom(timeAtom);
	return (
		<header className="flex justify-between flex-col gap-4 md:flex-row items-center mt-4 mb-8">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 bg-(--primary-yellow) rounded-md flex items-center justify-center">
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
						<Sun size={20} className="text-(--primary-yellow)" />
					) : (
						<Moon size={20} className="text-(--primary-yellow)" />
					)}
				</button>
			</div>
			<Segmented
				className="w-fit mx-auto bg-(--card-black)"
				defaultValue="week"
				onChange={(value) => {
					if (value === "week" || value === "month") {
						setTimeState(value);
					}
				}}
				options={[
					{ label: "Week", value: "week" },
					{ label: "Month", value: "month" },
					{
						label: (
							<p className="flex items-center gap-2">
								<BarChart2 size={16} /> Analytics
							</p>
						),
						value: "analytics",
					},
				]}
			/>
		</header>
	);
};

export default Header;
