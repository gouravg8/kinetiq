"use client";
import DateNavigation from "@/components/ui/DateNavigation";
import WeeklyView from "@/components/ui/WeeklyView";
import StatsCards from "@/components/ui/StatsCards";
import { ConfigProvider } from "antd";
import antdTheme from "@/theme/antdTheme";
import { ThemeProvider } from "next-themes";
import Providers from "@/components/Provider";
import Header from "@/components/ui/Header";

export default function Home() {
	return (
		<ConfigProvider theme={antdTheme}>
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
