"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { dateAtom } from "@/Jotai/timeAtom";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { Calendar, Dumbbell, Target, Zap } from "lucide-react";
import React from "react";

interface StatCardProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	className?: string;
}

const StatCard = ({ icon, label, value, className = "" }: StatCardProps) => {
	return (
		<div
			className={`w-11/12 bg-zinc-800 mx-auto rounded-md flex items-center py-3 px-4 gap-4 ${className}`}
		>
			<div className="p-2 rounded bg-zinc-700 text-(--primary-yellow)">
				{icon}
			</div>
			<div className="">
				<div className="text-sm font-light">{label}</div>
				<div className="font-semibold">{value}</div>
			</div>
		</div>
	);
};

const StatsCards = () => {
	const currentDate = useAtomValue(dateAtom);
	const currentMonth = dayjs(currentDate).format("MMM");

	const debouncedDate = useDebounce(currentDate);

	const { data: statsData, isLoading } = useQuery({
		queryKey: ["stats-card", debouncedDate],
		queryFn: async () => {
			const startOfWeek = currentDate.startOf("week").format("YYYY-MM-DD");
			const endOfWeek = currentDate.endOf("week").format("YYYY-MM-DD");

			const response = await api.get(`/api/stats?fromDate=${startOfWeek}&toDate=${endOfWeek}`);
			return response.data;
		},
		retry: false
	})

	const stats = [
		{ icon: <Zap size={24} />, label: "This Week", value: `${statsData?.thisWeek ?? 0} / 7` },
		{ icon: <Target size={24} />, label: "Streak", value: "0 days" },
		{ icon: <Dumbbell size={24} />, label: "Total Workouts", value: statsData?.totalWorkouts ?? 0 },
		{ icon: <Calendar size={24} />, label: `This Month (${currentMonth})`, value: statsData?.thisMonth ?? 0 },
	];

	return (
		<div className="flex flex-col md:flex-row gap-3 mb-4">
			{stats?.map((item) => (
				<StatCard key={item.label} icon={item?.icon} label={item?.label} value={item?.value} />
			))}
		</div>
	);
};

export default StatsCards;
