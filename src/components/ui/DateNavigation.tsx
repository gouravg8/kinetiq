"use client";
import React, { useState } from "react";
import { Button, DatePicker, Space } from "antd";
import {
	LeftOutlined,
	RightOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { timeAtom } from "@/Jotai/timeState";

const DateNavigation = () => {
	const [currentDate, setCurrentDate] = useState(dayjs());
	const timeSegment = useAtomValue(timeAtom);

	// Get start and end of current period
	const getPeriodRange = (date: dayjs.Dayjs) => {
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
		setCurrentDate(currentDate.subtract(1, timeSegment));
	};

	// Navigate to next Period
	const goToNextTime = () => {
		setCurrentDate(currentDate.add(1, timeSegment));
	};

	// Handle date picker change
	const handleDateChange = (date: React.SetStateAction<dayjs.Dayjs>) => {
		if (date) {
			setCurrentDate(date);
		}
	};

	// Format the period range display
	const formatPeriodRange = () => {
		const startMonth = periodRange.start.format("MMM");
		const endMonth = periodRange.end.format("MMM");
		const startDay = periodRange.start.format("D");
		const endDay = periodRange.end.format("D");

		if (startMonth === endMonth) {
			return `${startMonth} ${startDay} - ${endDay}`;
		} else {
			return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
		}
	};

	return (
		<div className="date-navigation">
			<Space
				// size=""
				align="center"
				// className=" w-full"
				// style={{ width: "100%", justifyContent: "center" }}
			>
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

			<style jsx>{`
        .date-navigation {
          background-color: var(--card-black);
          border-radius: 6px;
        //   padding: 12px 20px;
        //   margin-bottom: 20px;
        }
        
        .ant-picker {
          background-color: transparent !important;
        }
      `}</style>
		</div>
	);
};

export default DateNavigation;
