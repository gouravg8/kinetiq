"use client";
import React, { useState } from "react";
import { Button, Typography } from "antd";
import { Plus, Dumbbell } from "lucide-react";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { dateAtom, timeAtom } from "@/Jotai/timeAtom";
import WorkoutModal, { WorkoutType } from "./WorkoutModal";

interface WorkoutData {
	type: string;
	exerciseCount: number;
}

interface DayData {
	date: dayjs.Dayjs;
	workout?: WorkoutData;
}

const DayCard = ({ dayData, onClick }: { dayData: DayData, onClick: (date: dayjs.Dayjs) => void }) => {
	const { date, workout } = dayData;
	const dayName = date.format("ddd");
	const dayNumber = date.format("D");
	const isToday = date.isSame(dayjs(), "day");

	return (
		<div
			className={`bg-zinc-800 rounded-md h-48 px-4 pb-8 pt-4 ${isToday ? "border-2 border-(--primary-yellow)" : ""}`}
		>
			<div className="flex justify-between">
				<div className="text-lg font-bold">{dayName}</div>
				<div className="text-lg font-bold text-zinc-500">{dayNumber}</div>
			</div>

			{workout ? (
				<div className="flex flex-col items-center justify-center h-full -mt-3" onClick={() => onClick(date)}>
					<div className="flex items-center justify-center w-10 h-10 mb-2 rounded-md bg-(--primary-yellow)">
						<Dumbbell size={20} className="text-black" />
					</div>
					<div className="mb-1 text-sm font-semibold text-white">
						{workout.type}
					</div>
					{/* <div className="text-xs text-gray-400">
						{workout.exerciseCount} exercises
					</div> */}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-full -mt-3">
					<Button
						type="dashed"
						shape="circle"
						size="large"
						icon={<Plus className="pt-2" size={24} />}
						className="mb-2"
						onClick={() => onClick(date)}
					/>
					<div className="text-xs text-gray-500">Add workout</div>
				</div>
			)}
		</div>
	);
};

const WeeklyView = () => {
	const timeSegment = useAtomValue(timeAtom);
	const currentDate = useAtomValue(dateAtom);
	const [modal, setModal] = useState<{ open: boolean, data: WorkoutType }>({ open: false, data: { bodyPart: "", completed: false, exercises: [] } });
	const [selectedDate, setSelectedDate] = useState();

	const { Text } = Typography;

	// Generate week data
	const generateWeekData = (): DayData[] => {
		const startOfWeek = currentDate.startOf("week");
		const weekData: DayData[] = [];

		for (let i = 0; i < 7; i++) {
			const date = startOfWeek.add(i, "day");
			let workout: WorkoutData | undefined;

			// Sample workout data
			if (i === 0) workout = { type: "Chest", exerciseCount: 2 };
			if (i === 2) workout = { type: "Back", exerciseCount: 2 };
			if (i === 4) workout = { type: "Legs", exerciseCount: 1 };

			weekData.push({ date, workout });
		}

		return weekData;
	};

	const weekData = generateWeekData();

	const onClick = (date: dayjs.Dayjs) => {
		setModal(prev => ({ ...prev, open: true }))
		console.log({ date });
	}

	const handleSaveWorkout = ({ date, workoutData }: { date: dayjs.Dayjs, workoutData: WorkoutType }) => {
		console.log({ date, workoutData });
	}

	if (timeSegment !== "week") {
		return null; // Show monthly view component instead
	}

	return (
		<div className="">
			<div className="flex flex-col w-11/12 gap-4 mx-auto my-3">
				{weekData.map((dayData, index) => (
					<DayCard key={index} dayData={dayData} onClick={onClick} />
				))}
			</div>
			<WorkoutModal
				open={modal.open}
				data={modal.data}
				// data={workoutData}
				date={selectedDate}
				onSave={(date, workoutData) => handleSaveWorkout({ date, workoutData })}
				onClose={() => setModal(prev => ({ ...prev, open: false }))}
			/>
		</div>
	);
};

export default WeeklyView;
