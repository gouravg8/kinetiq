"use client"
import { Button, Row, Col, Card, Typography, Space, Statistic } from "antd"
import {
	CalendarOutlined,
	TrophyOutlined,
	BarChartOutlined,
	UserOutlined,
	PlayCircleOutlined,
	CheckCircleOutlined,
	FireOutlined,
	ThunderboltOutlined,
} from "@ant-design/icons"
import { useRouter } from "next/navigation"

const { Title, Paragraph } = Typography

export default function LandingPage() {
	const { push } = useRouter();
	const features = [
		{
			icon: <CalendarOutlined className="text-2xl text-yellow-500" />,
			title: "Smart Workout Planning",
			description:
				"Plan and organize your workouts with our intuitive weekly calendar view. Never miss a training session again.",
		},
		{
			icon: <BarChartOutlined className="text-2xl text-yellow-500" />,
			title: "Progress Tracking",
			description:
				"Monitor your fitness journey with detailed statistics, streak tracking, and comprehensive workout analytics.",
		},
		{
			icon: <TrophyOutlined className="text-2xl text-yellow-500" />,
			title: "Achievement System",
			description:
				"Stay motivated with our streak system and achievement badges. Celebrate every milestone in your fitness journey.",
		},
		{
			icon: <ThunderboltOutlined className="text-2xl text-yellow-500" />,
			title: "Exercise Library",
			description: "Access a comprehensive database of exercises with detailed tracking for sets, reps, and weights.",
		},
	]

	const stats = [
		{ title: "Active Users", value: "10K+", icon: <UserOutlined /> },
		{ title: "Workouts Completed", value: "250K+", icon: <CheckCircleOutlined /> },
		{ title: "Average Streak", value: "12 Days", icon: <FireOutlined /> },
		{ title: "Success Rate", value: "94%", icon: <TrophyOutlined /> },
	]

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white relative">
			<div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/10 pointer-events-none"></div>

			{/* Hero Section */}
			<div className="relative overflow-hidden">
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
					<Row gutter={[24, 32]} align="middle">
						<Col xs={24} lg={12}>
							<Space direction="vertical" size="small" className="w-full items-center md:items-start">
								{/* <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                        <ThunderboltOutlined className="text-black text-lg sm:text-xl" />
                                    </div>
                                    <Title level={2} className="!text-yellow-500 !mb-0 !text-xl sm:!text-2xl">
                                        Kinetiq
                                    </Title>
                                </div> */}

								<Title
									level={1}
									className="!text-white !mb-0 !text-4xl sm:!text-4xl lg:!text-5xl !font-bold !leading-tight text-center md:text-start"
								>
									Transform Your
									<span className="text-yellow-500"> Fitness Journey</span>
								</Title>

								<Paragraph className="!text-zinc-500 !text-base sm:!text-lg !leading-relaxed text-center md:text-start">
									Track your workouts, monitor progress, and achieve your fitness goals with Kinetiq. The modern workout
									tracker designed for serious fitness enthusiasts.
								</Paragraph>

								<Space size="middle">
									<Button
										type="primary"
										size="large"
										className="!bg-yellow-500 !border-yellow-500 hover:!bg-yellow-600 !text-black !font-semibold !h-10 sm:!h-12 !px-6 sm:!px-8 "
										icon={<PlayCircleOutlined />}
										onClick={() => push("/signin")}
									>
										Start Tracking
									</Button>
									{/* <Button
                                        size="large"
                                        className="!border-zinc-600 !text-white hover:!border-yellow-500 hover:!text-yellow-500 !h-10 sm:!h-12 !px-6 sm:!px-8"
                                    >
                                        View Demo
                                    </Button> */}
								</Space>
							</Space>
						</Col>

						<Col xs={24} lg={12}>
							<div className="relative mt-8 lg:mt-0">
								<div className="bg-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-zinc-800">
									<div className="flex items-center justify-between mb-4 sm:mb-6">
										<div className="flex items-center space-x-2">
											<div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
												<ThunderboltOutlined className="text-black text-xs sm:text-sm" />
											</div>
											<span className="text-white font-semibold text-sm sm:text-base">Workout Tracker</span>
										</div>
										<div className="text-zinc-400 text-xs sm:text-sm">Aug 24 - 30</div>
									</div>

									<div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
										{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
											<div
												key={day}
												className={`p-2 sm:p-3 rounded-lg border ${index === 0 ? "border-yellow-500 bg-yellow-500/10" : "border-zinc-700 bg-zinc-800"}`}
											>
												<div className="text-xs text-zinc-400 mb-1 truncate">{day.slice(0, 3)}</div>
												<div className="text-xs sm:text-sm text-white">{24 + index}</div>
												{/* {index === 0 && (
                                                    <div className="mt-1 sm:mt-2">
                                                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                                            <ThunderboltOutlined className="text-black text-xs" />
                                                        </div>
                                                        <div className="text-xs text-yellow-500 mt-1">Chest</div>
                                                    </div>
                                                )} */}
											</div>
										))}
									</div>

									<Row gutter={[8, 8]} className="sm:gutter-12">
										<Col span={12} sm={6}>
											<div className="bg-zinc-800 rounded-lg p-2 sm:p-3 text-center">
												<div className="text-yellow-500 text-sm sm:text-lg font-bold">0/7</div>
												<div className="text-xs text-zinc-400">This Week</div>
											</div>
										</Col>
										<Col span={12} sm={6}>
											<div className="bg-zinc-800 rounded-lg p-2 sm:p-3 text-center">
												<div className="text-yellow-500 text-sm sm:text-lg font-bold">0</div>
												<div className="text-xs text-zinc-400">Streak</div>
											</div>
										</Col>
										<Col span={12} sm={6}>
											<div className="bg-zinc-800 rounded-lg p-2 sm:p-3 text-center">
												<div className="text-yellow-500 text-sm sm:text-lg font-bold">6</div>
												<div className="text-xs text-zinc-400">Total</div>
											</div>
										</Col>
										<Col span={12} sm={6}>
											<div className="bg-zinc-800 rounded-lg p-2 sm:p-3 text-center">
												<div className="text-yellow-500 text-sm sm:text-lg font-bold">3</div>
												<div className="text-xs text-zinc-400">This Month</div>
											</div>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</div>

			{/* Features Section */}
			<div className="py-12 sm:py-16 lg:py-20 relative">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 sm:mb-16">
						<Title level={2} className="!text-white !mb-4 !text-2xl sm:!text-3xl lg:!text-4xl">
							Everything You Need to
							<span className="text-yellow-500"> Succeed</span>
						</Title>
						<Paragraph className="!text-zinc-400 !text-base sm:!text-lg max-w-2xl mx-auto">
							Kinetiq provides all the tools you need to track, analyze, and optimize your workout routine.
						</Paragraph>
					</div>

					<Row gutter={[16, 24]} className="sm:gutter-24 lg:gutter-32">
						{features.map((feature, index) => (
							<Col xs={24} sm={12} lg={6} key={index}>
								<Card
									className="!bg-zinc-900 !border-gray-800 hover:!border-yellow-500/50 transition-all duration-300 h-full"
									styles={{ body: { padding: "20px" } }}
								>
									<Space direction="vertical" size="middle" className="w-full">
										<div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
											{feature.icon}
										</div>
										<Title level={4} className="!text-white !mb-0 !text-lg sm:!text-xl">
											{feature.title}
										</Title>
										<Paragraph className="!text-zinc-400 !mb-0 !text-sm sm:!text-base">{feature.description}</Paragraph>
									</Space>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</div>

			{/* Stats Section */}
			<div className="py-12 sm:py-16 lg:py-20 relative">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 sm:mb-16">
						<Title level={2} className="!text-white !mb-4 !text-2xl sm:!text-3xl lg:!text-4xl">
							Trusted by <span className="text-yellow-500">Thousands</span>
						</Title>
						<Paragraph className="!text-zinc-400 !text-base sm:!text-lg">
							Join the growing community of fitness enthusiasts achieving their goals with Kinetiq.
						</Paragraph>
					</div>

					<Row gutter={[16, 24]} className="sm:gutter-24 lg:gutter-32">
						{stats.map((stat, index) => (
							<Col xs={12} sm={6} key={index}>
								<Card className="!bg-zinc-900 !border-gray-800 text-center" bodyStyle={{ padding: "24px 16px" }}>
									<div className="text-yellow-500 text-2xl sm:text-3xl mb-2 sm:mb-3">{stat.icon}</div>
									<Statistic
										value={stat.value}
										valueStyle={{ color: "#f59e0b", fontSize: "1.5rem", fontWeight: "bold" }}
										className="sm:text-2xl"
									/>
									<div className="text-zinc-400 mt-2 text-xs sm:text-sm">{stat.title}</div>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</div>

			{/* CTA Section */}
			<div className="py-12 sm:py-16 lg:py-20 relative">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<Title level={2} className="!text-white !mb-6 !text-2xl sm:!text-3xl lg:!text-4xl">
						Ready to Transform Your Fitness?
					</Title>
					<Paragraph className="!text-zinc-300 !text-base sm:!text-lg !mb-8 max-w-2xl mx-auto">
						Start your journey today and experience the difference that proper workout tracking can make. Join thousands
						of users who have already transformed their fitness routine.
					</Paragraph>
					<Space size="middle" className="flex-wrap justify-center">
						<Button
							type="primary"
							size="large"
							className="!bg-yellow-500 !border-yellow-500 hover:!bg-yellow-600 !text-black !font-semibold !h-10 sm:!h-12 !px-6 sm:!px-8"
							onClick={() => push("/signin")}
						>
							Get Started Free
						</Button>
						{/* <Button
                            size="large"
                            className="!border-zinc-600 !text-white hover:!border-yellow-500 hover:!text-yellow-500 !h-10 sm:!h-12 !px-6 sm:!px-8"
                        >
                            Learn More
                        </Button> */}
					</Space>
				</div>
			</div>
		</div>
	)
}
