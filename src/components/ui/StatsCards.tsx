"use client";
import React from "react";
import { Zap, Target, Dumbbell, Calendar } from "lucide-react";

interface StatCardProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	className?: string;
}

const StatCard = ({ icon, label, value, className = "" }: StatCardProps) => {
	return (
		<div
			className={`bg-zinc-800 w-11/12 mx-auto rounded-md flex items-center py-3 px-4 gap-4 ${className}`}
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
	const stats = [
		{ icon: <Zap size={24} />, label: "This Week", value: "0 / 7" },
		{ icon: <Target size={24} />, label: "Streak", value: "0 days" },
		{ icon: <Dumbbell size={24} />, label: "Total Workouts", value: "6" },
		{ icon: <Calendar size={24} />, label: "This Month", value: "3" },
	];
	return (
		<div className="flex flex-col gap-3 mb-4">
			{stats?.map((item) => (
				<StatCard icon={item?.icon} label={item?.label} value={item?.value} />
			))}
		</div>
	);
};

export default StatsCards;
