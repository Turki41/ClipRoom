import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params;

        if (!id || id === 'undefined') {
            console.error("Invalid user ID provided in videos by user ID route controller:", id);
            return NextResponse.json({ message: "Error fetching videos for user" }, { status: 400 });
        }

        const supabase = await createClient()

        const { data: videos, error: videosError } = await supabase.from('Videos').select('*, Users(id, userName, profilePicture)').eq('user_id', id);

        if (videosError) {
            console.error("Error fetching videos for user ID:", id, videosError);
            return NextResponse.json({ message: "Error fetching videos for user" }, { status: 500 });
        }

        return NextResponse.json(videos, { status: 200 });
    } catch (error) {
        console.error("unhandled error fetching videos by user ID route controller:", error);
        return NextResponse.json({ message: `Internal server error` }, { status: 500 });
    }
}