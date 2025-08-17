"use client";
import DateNavigation from "@/components/ui/DateNavigation";
import WeeklyView from "@/components/ui/WeeklyView";
import StatsCards from "@/components/ui/StatsCards";
import Header from "@/components/ui/Header";
import { useAtomValue } from "jotai";
import themeAtom from "@/Jotai/themeAtom";

export default function Home() {
	return (
		<>
			<Header />
			<DateNavigation />
			<WeeklyView />
			<StatsCards />
		</>
	)
}
