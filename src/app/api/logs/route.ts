import { NextRequest, NextResponse } from "next/server";
import workoutModal from "@/types/workoutModalType"
import { drizzleClient } from "@/db";
import { dailyLogs } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, asc, eq, gte, lte } from "drizzle-orm";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);
    const fromDate = url.searchParams.get("fromDate");
    const toDate = url.searchParams.get("toDate");

    if (!fromDate || !toDate) {
        return NextResponse.json(
            { error: "Missing query params. Use ?fromDate=...&toDate=..." },
            { status: 400 }
        );
    }

    const parseFrom = new Date(fromDate);
    const parseTo = new Date(toDate);

    const data = await drizzleClient
        .select()
        .from(dailyLogs)
        .where(
            and(
                eq(dailyLogs.userId, session.user.id),
                gte(dailyLogs.date, parseFrom),
                lte(dailyLogs.date, parseTo)
            )
        )
        .orderBy(asc(dailyLogs.date))

    return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = workoutModal.safeParse(body);

    const session = await auth.api.getSession({
        headers: await headers(), // passes all incoming request headers
    });

    if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });


    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    // const [inserted] = await drizzleClient
    //     .insert(dailyLogs)
    //     .values({
    //         userId: session.user.id,
    //         bodyPart: parsed.data.bodyPart,
    //         date: new Date(),
    //         isCompleted: parsed.data.isCompleted
    //     })
    //     .returning();

    const upserted = await drizzleClient
        .insert(dailyLogs)
        .values({
            userId: session.user.id,
            bodyPart: parsed.data.bodyPart,
            dateOnly: new Date().toISOString().slice(0, 10),
            date: new Date(),
            isCompleted: parsed.data.isCompleted,
        })
        .onConflictDoUpdate({
            target: [dailyLogs.userId, dailyLogs.dateOnly],
            set: {
                bodyPart: parsed.data.bodyPart,
                date: new Date(),
                isCompleted: parsed.data.isCompleted,
                updatedOn: new Date(),
            },
        })


    return NextResponse.json(upserted, { status: 201 });
}