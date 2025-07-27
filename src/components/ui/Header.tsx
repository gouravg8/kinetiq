"use client";
import { BarChart2, Dumbbell, Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { Segmented } from "antd";
import { timeAtom, timeType } from "@/Jotai/timeAtom";
import { useAtom, useSetAtom } from "jotai";
import { useTheme } from "next-themes";

const Header = () => {
	const { theme, setTheme } = useTheme();
	const [timeSegment, setTimeSegment] = useAtom(timeAtom);
	return (
		<header className="flex justify-between flex-col gap-4 md:flex-row items-center mt-4 mb-8">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 bg-accent rounded-md flex items-center justify-center">
						<Dumbbell className="text-black" size={28} />
					</div>
					<div>
						<h1 className="text-3xl font-bold">Workout Tracker</h1>
						<p className="text-gray-400">Track your fitness journey</p>
					</div>
				</div>
				<button
					onClick={() =>
						setTheme((prev) => (prev === "dark" ? "light" : "dark"))
					}
					className="p-2 rounded-full bg-gray-200 dark:bg-[#1C1C1E] hover:bg-gray-300 dark:hover:bg-gray-800 transition cursor-pointer"
				>
					{theme === "dark" ? (
						<Sun size={20} className="text-(--primary-yellow)" />
					) : (
						<Moon size={20} className="text-(--primary-yellow)" />
					)}
				</button>
			</div>
			<Segmented
				className="w-fit mx-auto bg-(--card-black)"
				value={timeSegment}
				onChange={(value: timeType) => {
					if (value) {
						setTimeSegment(value);
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
