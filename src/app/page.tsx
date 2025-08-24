"use client";
import DateNavigation from "@/components/ui/DateNavigation";
import WeeklyView from "@/components/ui/WeeklyView";
import StatsCards from "@/components/ui/StatsCards";
import Header from "@/components/ui/Header";

export default function Home() {
	return (
		<>
			<DateNavigation />
			<WeeklyView />
			<StatsCards />
		</>
	)
}
