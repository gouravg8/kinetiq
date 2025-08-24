"use client";
import DateNavigation from "@/components/ui/DateNavigation";
import WeeklyView from "@/components/ui/WeeklyView";
import StatsCards from "@/components/ui/StatsCards";

export default function Home() {
	return (
		<div className="max-w-7xl mx-auto">
			<DateNavigation />
			<WeeklyView />
			<StatsCards />
		</div>
	)
}
