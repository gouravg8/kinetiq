"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { dateAtom } from "@/Jotai/timeAtom";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { Calendar, Dumbbell, Target, Zap } from "lucide-react";
import React from "react";
import { toast } from "sonner";

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

const StatCardSkeleton = () => {
	return (
		<div
			className="w-11/12 bg-zinc-800 mx-auto rounded-md flex items-center py-3 px-4 gap-4"
		>
			<div className="p-2 rounded bg-zinc-700">
				<div className="w-6 h-6 bg-zinc-600 rounded animate-pulse"></div>
			</div>
			<div className="flex-1 space-y-2">
				<div className="h-3 bg-zinc-700 rounded w-3/4 animate-pulse"></div>
				<div className="h-4 bg-zinc-600 rounded w-1/2 animate-pulse"></div>
			</div>
		</div>
	);
}

const StatsCards = () => {
	const currentDate = useAtomValue(dateAtom);
	const currentMonth = dayjs(currentDate).format("MMM");

	const debouncedDate = useDebounce(currentDate);

	const { data: statsData, isLoading, error, isError } = useQuery({
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

	if (isError) toast.error(error.message);

	if (isLoading) {
		return (
			<div className="flex flex-col md:flex-row gap-3 mb-4">
				<StatCardSkeleton />
				<StatCardSkeleton />
				<StatCardSkeleton />
				<StatCardSkeleton />
			</div>
		);
	}

	return (
		<div className="flex flex-col md:flex-row gap-3 mb-4">
			{stats?.map((item) => (
				<StatCard key={item.label} icon={item?.icon} label={item?.label} value={item?.value} />
			))}
		</div>
	);
};

export default StatsCards;
