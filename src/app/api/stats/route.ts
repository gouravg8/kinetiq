import { drizzleClient } from "@/db";
import { dailyLogs } from "@/db/schema";
import { auth } from "@/lib/auth";
import dayjs from "dayjs";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return new Response("Unauthorized", { status: 401 });
	}

	const url = new URL(req.url);
	const fromDate = url.searchParams.get("fromDate");
	const toDate = url.searchParams.get("toDate");

	if (!fromDate || !toDate) {
		return NextResponse.json(
			{ error: "Missing query params. Use ?fromDate=...&toDate=..." },
			{ status: 400 },
		);
	}

	const parseFrom = new Date(fromDate);
	const parseTo = new Date(toDate);
	parseTo.setDate(parseTo.getDate() + 1);
	parseTo.setMilliseconds(parseTo.getMilliseconds() - 1);

	const parsedMonth = new Date(
		dayjs(fromDate).startOf("month").format("YYYY-MM-DD"),
	);
	console.log({ parsedMonth });

	const dateFilter = and(
		eq(dailyLogs.userId, session.user.id),
		gte(dailyLogs.date, parseFrom),
		lte(dailyLogs.date, parseTo),
	);

	const thisWeekResult = await drizzleClient
		.select({
			total: sql<number>`SUM(CASE WHEN ${dailyLogs.isCompleted} THEN 1 ELSE 0 END)`,
		})
		.from(dailyLogs)
		.where(dateFilter);

	const thisWeek = thisWeekResult[0].total || 0;

	// const streak = await drizzleClient
	// 	.select()
	// 	.from(dailyLogs)
	// 	// in this date range
	// 	.where(dateFilter)
	// 	.orderBy(asc(dailyLogs.date));

	const totalWorkoutsResult = await drizzleClient
		.select({
			total: sql<number>`SUM(CASE WHEN ${dailyLogs.isCompleted} THEN 1 ELSE 0 END)`,
		})
		.from(dailyLogs);

	const totalWorkouts = totalWorkoutsResult[0].total || 0;

	const thisMonthResult = await drizzleClient
		.select({
			total: sql<number>`SUM(CASE WHEN ${dailyLogs.isCompleted} THEN 1 ELSE 0 END)`,
		})
		.from(dailyLogs)
		.where(
			and(
				eq(dailyLogs.userId, session.user.id),
				gte(dailyLogs.date, parsedMonth),
			),
		);

	const thisMonth = thisMonthResult[0].total || 0;

	return NextResponse.json(
		{ thisWeek, totalWorkouts, thisMonth },
		{ status: 200 },
	);
}
