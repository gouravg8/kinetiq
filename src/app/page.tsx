"use client";
import DateNavigation from "@/components/ui/DateNavigation";
import WeeklyView from "@/components/ui/WeeklyView";
import StatsCards from "@/components/ui/StatsCards";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider } from "next-themes";
import Providers from "@/components/Provider";
import Header from "@/components/ui/Header";
import { useAtomValue } from "jotai";
import themeAtom from "@/Jotai/themeAtom";

export default function Home() {
	const themeValue = useAtomValue(themeAtom);
	return (
		<ConfigProvider
			theme={{ algorithm: themeValue === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
			<ThemeProvider>
				<Providers>
					<Header />
					<DateNavigation />
					<WeeklyView />
					<StatsCards />
				</Providers>
			</ThemeProvider>
		</ConfigProvider>
	);
}
