"use client";
import { Dumbbell, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
// import { timeAtom, timeType } from "@/Jotai/timeAtom";
// import { useAtom } from "jotai";
import { authClient } from "@/lib/auth-client";
// import themeAtom from "@/Jotai/themeAtom";
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/useIsMobile";


type SessionType = Awaited<ReturnType<typeof authClient.getSession>>;

const Profile = ({ items }: MenuProps) => {
	return <Dropdown className="cursor-pointer" menu={{ items }} placement="topRight">
		<Avatar icon={<User />} />
	</Dropdown>

}

const Header = () => {
	// const [timeSegment, setTimeSegment] = useAtom(timeAtom);
	const [session, setSession] = useState({ data: null, error: null });
	// const [themeVal, setThemeVal] = useAtom(themeAtom);
	const isMobile = useIsMobile();

	const router = useRouter();

	const data = async () => {
		const d = await authClient.getSession();

		setSession(d as SessionType);
	}

	useEffect(() => { data() }, []);

	const items: MenuProps['items'] = [
		// {
		// 	key: '1',
		// 	label: 'My Account',
		// 	disabled: true,
		// },
		// {
		// 	type: 'divider',
		// },
		// {
		// 	key: '2',
		// 	label: "Theme",
		// 	extra: themeVal === "dark" ? <Moon size={"12"} /> : <Sun size={"12"} />,
		// 	onClick: () => setThemeVal(prev => {
		// 		if (prev === "dark") return "light";
		// 		return "dark";
		// 	})
		// },
		!session?.data ?
			{
				key: "signin",
				label: "Sign in",
				onClick: () => router.push("/signin")
			} :
			{
				key: '3',
				label: 'Logout',
				danger: true,
				onClick: () => authClient.signOut()
			},
	];


	return (
		<header className="sticky top-0 z-50 bg-(--primary-black)">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row py-3">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-4">
						<div className="flex items-center justify-center w-12 h-12 rounded-md bg-accent">
							<Dumbbell
								className="w-20 h-12 px-2 text-black rounded bg-(--primary-yellow) "
								size={58}
							/>
						</div>
						<div>
							<h1 className="text-3xl font-bold">Workout Tracker</h1>
							<p className="text-gray-400">Track your fitness journey</p>
						</div>
					</div>
					{isMobile && <Profile items={items} />}
				</div>
				<div className="flex items-center gap-4">
					{/* <Segmented
					className="w-fit mx-auto bg-(--card-black)"
					value={timeSegment}
					onChange={(value: timeType) => {
						if (value) {
							setTimeSegment(value);
						}
					}}
					optons={[
						{ label: "Week", value: "week" },
						{ label: "Month", value: "month" },
						{
							label: (
								<p className="flex items-center gap-2">
									<BarChart2 size={16} /> Analytics
								</p>
							),
							value: "analytics",
						},
					]}
				/> */}
					{!isMobile && <Profile items={items} />}
				</div>
			</div>
		</header>
	);
};

export default Header;
