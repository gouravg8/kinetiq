"use client";
import React from "react";
import { Zap, Target, Dumbbell, Calendar } from "lucide-react";

interface StatCardProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	className?: string;
	key: string | number;
}

const StatCard = ({ icon, label, value, className = "", key }: StatCardProps) => {
	return (
		<div key={key}
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
	const stats = [
		{ icon: <Zap size={24} />, label: "This Week", value: "0 / 7" },
		{ icon: <Target size={24} />, label: "Streak", value: "0 days" },
		{ icon: <Dumbbell size={24} />, label: "Total Workouts", value: "6" },
		{ icon: <Calendar size={24} />, label: "This Month", value: "3" },
	];
	return (
		<div className="w-11/12 mx-auto flex flex-col md:flex-row gap-3 mb-4">
			{stats?.map((item) => (
				<StatCard key={item.value} icon={item?.icon} label={item?.label} value={item?.value} />
			))}
		</div>
	);
};

export default StatsCards;
