import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model" // adjust import path if needed
import connectDB from "@/lib/mongodb";

/**
 * GET /api/events/[slug]
 * Fetch a single event by its unique slug.
 */
export async function GET(
    _: NextRequest,
     context: { params: { slug?: string } }
) {
    try {
        const { params } = context;
        const {slug}=await params;
        // console.log(params)

        /**
         * Validate slug
         */
        if (!slug || typeof slug !== "string") {
            return NextResponse.json(
                { message: "Event slug is required and must be a string." },
                { status: 400 }
            );
        }

        /**
         * Ensure DB connection (safe if already connected)
         */
        await connectDB();

        /**
         * Query event by slug
         */
        const event = await Event.findOne({ slug }).lean();

        if (!event) {
            return NextResponse.json(
                { message: `Event not found for slug: ${slug}` },
                { status: 404 }
            );
        }

        /**
         * Success response
         */
        return NextResponse.json({ event }, { status: 200 });
    } catch (error: unknown) {
        /**
         * Unexpected / internal errors
         */
        const message =
            error instanceof Error ? error.message : "Internal server error";

        return NextResponse.json(
            {
                message: "Failed to fetch event.",
                error: message,
            },
            { status: 500 }
        );
    }
}