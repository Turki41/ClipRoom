import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request, {params}: {params:Promise<{ id: string }>}) => {
    try {
        const { id } = await params;

        if (!id || id === 'undefined') {
            console.error("Invalid ID provided in video id route controller:", id);
            return NextResponse.json({ message: "Valid ID is required" }, { status: 400 });
        }
        const supabase = await createClient()

        const { data: video, error: videoError } = await supabase.from('Videos').select('*, Users(userName, profilePicture)').eq('id', id).single();

        if (videoError) {
            console.error("Error fetching video in video id route controller:", videoError);
            return NextResponse.json({ message: `Video not found` }, { status: 404 });
        }

        return NextResponse.json({ video }, { status: 200 });
    } catch (error) {
        console.error("unhandled error fetching video by ID route controller:", error);
        return NextResponse.json({ message: `Internal server error` }, { status: 500 });
    }
}