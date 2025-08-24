"use client";
import React, { useState } from "react";
import { Button, Space } from "antd";
import {
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useAtomValue, useSetAtom } from "jotai";
import { dateAtom, timeAtom, timeType } from "@/Jotai/timeAtom";

const DateNavigation = () => {
	const [currentDate, setCurrentDate] = useState(dayjs());
	const timeSegment = useAtomValue<timeType>(timeAtom);
	const setDate = useSetAtom(dateAtom);

	// Get start and end of current period
	const getPeriodRange = (date: dayjs.Dayjs) => {
		if (timeSegment === "analytics") return;
		const startOfPeriod = date.startOf(timeSegment);
		const endOfPeriod = date.endOf(timeSegment);
		return {
			start: startOfPeriod,
			end: endOfPeriod,
		};
	};

	const periodRange = getPeriodRange(currentDate);

	// Navigate to previous Period
	const goToPreviousTime = () => {
		if (timeSegment === "analytics") return;
		setCurrentDate(currentDate.subtract(1, timeSegment));
		setDate(currentDate.subtract(1, timeSegment));
	};

	// Navigate to next Period
	const goToNextTime = () => {
		if (timeSegment === "analytics") return;
		setCurrentDate(currentDate.add(1, timeSegment));
		setDate(currentDate.add(1, timeSegment));
	};

	// Handle date picker change
	// const handleDateChange = (date: React.SetStateAction<dayjs.Dayjs>) => {
	// 	if (date) {
	// 		setCurrentDate(date);
	// 	}
	// };

	// Format the period range display
	const formatPeriodRange = () => {
		const startMonth = periodRange?.start.format("MMM");
		const endMonth = periodRange?.end.format("MMM");
		const startDay = periodRange?.start.format("D");
		const endDay = periodRange?.end.format("D");

		if (startMonth === endMonth) {
			return `${startMonth} ${startDay} - ${endDay}`;
		} else {
			return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
		}
	};

	return (
		<div className="px-2 py-1 mt-4 mx-auto rounded bg-zinc-800 w-fit">
			<Space align="center">
				{/* Previous period Button */}
				<Button
					type="text"
					icon={<LeftOutlined />}
					onClick={goToPreviousTime}
					className="rounded"
					// size="large"
					style={{
						color: "var(--text-secondary)",
						background: "transparent",
					}}
				/>

				{/* period Range Display */}
				<div
					className="week-display"
					style={{
						// fontSize: "16px",
						fontWeight: "600",
						color: "var(--text-primary)",
						minWidth: "140px",
						textAlign: "center",
					}}
				>
					{formatPeriodRange()}
				</div>

				{/* Next period Button */}
				<Button
					type="text"
					icon={<RightOutlined />}
					onClick={goToNextTime}
					className="rounded-2xl"
					// size="large"
					style={{
						color: "var(--text-secondary)",
						// background: "transparent",
					}}
				/>
			</Space>
		</div>
	);
};

export default DateNavigation;
