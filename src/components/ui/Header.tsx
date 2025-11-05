"use client"
import { Avatar, Dropdown, type MenuProps } from "antd"
import { Dumbbell, User } from "lucide-react"
import { useEffect } from "react"
// import { timeAtom, timeType } from "@/Jotai/timeAtom";
// import { useAtom } from "jotai";
import { authClient } from "@/lib/auth-client"
// import themeAtom from "@/Jotai/themeAtom";
import { useIsMobile } from "@/hooks/useIsMobile"
import { userAtom } from "@/Jotai/UserAtom"
import { useAtom } from "jotai"
import { redirect, useRouter } from "next/navigation"

export type SessionType = Awaited<ReturnType<typeof authClient.getSession>>

const Profile = ({ items }: MenuProps) => {
	return (
		<Dropdown
			className="cursor-pointer"
			menu={{ items }}
			placement="topRight"
			popupRender={(menu) => <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl">{menu}</div>}
		>
			<Avatar icon={<User />} className="bg-amber-500 hover:bg-amber-400 transition-colors border-2 border-amber-400" />
		</Dropdown>
	)
}

const Header = () => {
	// const [timeSegment, setTimeSegment] = useAtom(timeAtom);
	const [user, setUser] = useAtom(userAtom);
	// const [themeVal, setThemeVal] = useAtom(themeAtom);
	const isMobile = useIsMobile();

	const router = useRouter();

	const data = async () => {
		const d = await authClient.getSession();
		setUser(d as SessionType);
	}

	useEffect(() => {
		data();
	}, [])

	const items: MenuProps["items"] = [
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
		!user?.data
			? {
				key: "signin",
				label: <span className="text-amber-400 hover:text-amber-300 font-medium">Sign in</span>,
				onClick: () => router.push("/signin"),
			}
			: {
				key: "3",
				label: <span className="text-red-400 hover:text-red-300 font-medium">Logout</span>,
				danger: true,
				onClick: () => {
					authClient.signOut()
					redirect("/signin")
				},
			},
	]

	return (
		<header className="sticky top-0 z-50 bg-(--primary-black) backdrop-blur-2xl">
			<div className="md:max-w-7xl w-full mx-auto flex flex-col items-center justify-between gap-4 md:flex-row py-4">
				<div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push("/")}>
					<div className="flex items-center gap-4">
						<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg">
							<Dumbbell className="w-6 h-6 text-black" size={24} />
						</div>
						<div>
							<h1 className="text-2xl md:text-3xl font-bold text-white">Kinetiq</h1>
							<p className="text-zinc-400 text-sm">Track your fitness journey</p>
						</div>
					</div>
					{isMobile && <Profile items={items} />}
				</div>
				{!isMobile && <div className="flex items-center gap-4">
					{/* <Segmented
					className="w-fit mx-auto bg-(--card-black)"
					value={timeSegment}
					onChange={(value: timeType) => {
						if (value) {
							setTimeSegment(value);
						}
					}}
					options={[
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
					<Profile items={items} />
				</div>}
			</div>
		</header>
	)
}

export default Header
