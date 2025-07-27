"use client";
import React, { useState } from "react";
import { Button, DatePicker, Space } from "antd";
import {
	LeftOutlined,
	RightOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const DateNavigation = () => {
	const [currentDate, setCurrentDate] = useState(dayjs());

	// Get start and end of current week
	const getWeekRange = (date: dayjs.Dayjs) => {
		const startOfWeek = date.startOf(timeSegment);
		const endOfWeek = date.endOf(timeSegment);
		return {
			start: startOfWeek,
			end: endOfWeek,
		};
	};

	const weekRange = getWeekRange(currentDate);

	// Navigate to previous week
	const goToPreviousTime = () => {
		setCurrentDate(currentDate.subtract(1, timeSegment));
	};

	// Navigate to next week
	const goToNextTime = () => {
		setCurrentDate(currentDate.add(1, timeSegment));
	};

	// Handle date picker change
	const handleDateChange = (date: React.SetStateAction<dayjs.Dayjs>) => {
		if (date) {
			setCurrentDate(date);
		}
	};

	// Format the week range display
	const formatWeekRange = () => {
		const startMonth = weekRange.start.format("MMM");
		const endMonth = weekRange.end.format("MMM");
		const startDay = weekRange.start.format("D");
		const endDay = weekRange.end.format("D");

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
				{/* Previous Week Button */}
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

				{/* Week Range Display */}
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
					{formatWeekRange()}
				</div>

				{/* Next Week Button */}
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
