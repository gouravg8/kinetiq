"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { Plus, Dumbbell } from "lucide-react";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { dateAtom, timeAtom } from "@/Jotai/timeAtom";
import WorkoutModal, { WorkoutType } from "./WorkoutModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";

export interface LogsDataType {
	id: string;
	userId?: string;
	dateOnly?: string; // Format: YYYY-MM-DD
	date: string; // ISO timestamp
	updatedOn?: string; // ISO timestamp
	bodyPart: string;
	isCompleted: boolean;
}

const DayCard = ({ dayData, onClick, setModal }:
	{ dayData: LogsDataType, onClick: (date: LogsDataType) => void, setModal: React.Dispatch<React.SetStateAction<{ open: boolean, data: LogsDataType }>> }) => {
	const dayName = dayjs(dayData?.date)?.format("ddd");
	const dayNumber = dayjs(dayData?.date)?.format("D");
	const isToday = dayjs(dayData?.date)?.isSame(dayjs(), "day");

	const handleClick = () => {
		if (isToday) {
			onClick(dayData);
			setModal({ open: true, data: dayData });
		}
	}

	return (
		<div
			className={`w-11/12 md:w-60 mx-auto bg-zinc-800 rounded-md h-48 px-4 pb-8 pt-4 ${isToday ? "border-2 border-(--primary-yellow)" : ""}`}
		>
			<div className="flex justify-between">
				<div className="text-lg font-bold">{dayName}</div>
				<div className="text-lg font-bold text-zinc-500">{dayNumber}</div>
			</div>

			{dayData?.bodyPart ? (
				<div className="flex flex-col items-center justify-center h-full -mt-3" onClick={handleClick}>
					<div className="flex items-center justify-center w-10 h-10 mb-2 rounded-md bg-(--primary-yellow)">
						<Dumbbell size={20} className="text-black" />
					</div>
					<div className="mb-1 text-sm font-semibold text-white">
						{dayData?.bodyPart}
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
						onClick={() => onClick(dayData)}
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
	const [modal, setModal] = useState<{ open: boolean, data: LogsDataType }>({ open: false, data: { id: "", date: ",", bodyPart: "", isCompleted: false } });

	const onClick = () => {
		setModal(prev => ({ ...prev, open: true }))
	}

	const { data: logsData, refetch } = useQuery({
		queryKey: ["get-workout"],
		queryFn: () => {
			const startOfWeek = currentDate.startOf("week").format("YYYY-MM-DD");
			const endOfWeek = currentDate.endOf("week").format("YYYY-MM-DD");

			return api.get(`/api/logs?fromDate=${startOfWeek}&toDate=${endOfWeek}`)
		},
		// enabled: false,
		retry: false
	})

	// Generate week data
	const generateWeekData = (logsData: LogsDataType[]): LogsDataType[] => {
		const startOfWeek = currentDate.startOf("week");
		const weekData: LogsDataType[] = [];

		for (let i = 0; i < 7; i++) {
			const date = startOfWeek.add(i, "day");
			const todayData = logsData?.filter(
				(item: LogsDataType) => dayjs(item.date).isSame(date, "day")
			)[0];

			weekData.push(todayData ?? { id: i, date, bodyPart: "" });
		}

		return weekData;
	};


	const workoutMutation = useMutation({
		mutationKey: ["save-workout"],
		mutationFn: (data: WorkoutType) => api.post("/api/logs", data),
		onSuccess: () => {
			refetch();
			toast.success("Todays workout updated!");
		},
		onError: (error) => {
			toast.error(error?.message || "Issue while updating workout");
		}
	})

	const handleSaveWorkout = ({ workoutData }: { workoutData: WorkoutType }) => {
		workoutMutation.mutate(workoutData);
	}

	if (timeSegment !== "week") {
		return null; // Show monthly view component instead
	}

	return (
		<div className="">
			<div className="flex flex-col md:flex-row w-11/12 gap-4 mx-auto my-3">
				{generateWeekData(logsData?.data)?.map((dayData: LogsDataType, index: number) => (
					<DayCard key={index} dayData={dayData} onClick={onClick} setModal={setModal} />
				))}
			</div>
			<WorkoutModal
				open={modal.open}
				data={modal.data}
				// data={workoutData}
				onSave={(workoutData) => handleSaveWorkout({ workoutData })}
				onClose={() => setModal(prev => ({ ...prev, open: false }))}
			/>
		</div>
	);
};

export default WeeklyView;
