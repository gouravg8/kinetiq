"use client";
import React, { useState } from "react";
import { Segmented } from "antd";
import { BarChart2, Dumbbell, Plus } from "lucide-react";
import DateNavigation from "./DateNavigation";
import dayjs from "dayjs";

const NavigationBar = () => {
	return (
		<div>
			<div className="flex justify-between items-center gap-3 flex-col p-3 rounded-md">
				<DateNavigation timeSegment={time} />
			</div>
		</div>
	);
};

export default NavigationBar;

const renderWeekView = (date: dayjs.Dayjs) => {
	const startOfWeek = (date: string | number | Date) => {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() - day + (day === 0 ? -6 : 1);
		return new Date(d.setDate(diff));
	};

	const addDays = (date: string | number | Date, days: number) => {
		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	};

	const weekStart = dayjs.startOf(currentDate);
	const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
	const today = new Date();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
			{days.map((day) => {
				const dateStr = toISODateString(day);
				const workout = workouts[dateStr];
				const isToday = toISODateString(day) === toISODateString(today);

				return (
					<div
						key={dateStr}
						onClick={() => handleDateClick(day)}
						className={`bg-white dark:bg-[#1C1C1E] p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-yellow-500/20 flex flex-col justify-between h-48 ${isToday ? "border-2 border-yellow-500" : "border-2 border-transparent"}`}
					>
						<div>
							<div className="flex justify-between items-center">
								<span className="font-bold text-lg text-black dark:text-white">
									{formatDate(day, { weekday: "short" })}
								</span>
								<span
									className={`font-bold text-2xl ${isToday ? "text-yellow-500" : "text-gray-400 dark:text-gray-500"}`}
								>
									{formatDate(day, { day: "numeric" })}
								</span>
							</div>
							{isToday && (
								<div className="text-center">
									<span className="text-xs bg-yellow-500 text-black font-bold px-2 py-0.5 rounded">
										Today
									</span>
								</div>
							)}
						</div>
						<div className="flex-grow flex items-center justify-center">
							{workout ? (
								<div className="text-center">
									<Dumbbell
										className="mx-auto text-yellow-500 mb-2"
										size={24}
									/>
									<p className="text-black dark:text-white font-semibold">
										{workout.bodyPart}
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										{workout.exercises.length} exercises
									</p>
								</div>
							) : (
								<div className="text-center text-gray-400 dark:text-gray-500 group">
									<div className="w-12 h-12 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-yellow-500 flex items-center justify-center transition-colors">
										<Plus
											size={24}
											className="text-gray-500 dark:text-gray-400 group-hover:text-black"
										/>
									</div>
									<span className="text-sm mt-2">Add workout</span>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};
