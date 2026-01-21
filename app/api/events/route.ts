import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        console.log(NextRequest)
        const formdata = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formdata);
        } catch (error) {
            return NextResponse.json({ message: "Invalid form of data" }, { status: 400 });
        }

        const file = formdata.get('image') as File;
        if (!file) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 });
        }

        let tags = JSON.parse(formdata.get("tags") as string);
        let agenda = JSON.parse(formdata.get("agenda") as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadres = await new Promise((res, rej) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (err, result) => {
                if (err) {
                    rej(err)
                }
                res(result)
            }).end(buffer)
        })

        event.image = (uploadres as { secure_url: string }).secure_url;

        const createdevent = await Event.create({ ...event, tags, agenda });

        return NextResponse.json({ message: "Event created sucessfully", data: createdevent }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Event creation failed", error: error instanceof Error ? error.message : "unknown" }, { status: 500 })
    }
}

export async function GET() {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: "Event list sucessfully fethced", events: events }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Event fetch failed", error: error instanceof Error ? error.message : "unknown" }, { status: 500 })
    }
}