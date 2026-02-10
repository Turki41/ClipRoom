import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
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

        const currentViews = Number(video.views) || 0;

        const { data: videoCount, error: viewCounterError } = await supabase.from('Videos').update({ 'views': (currentViews + 1) }).eq('id', id).single()
        if (viewCounterError) {
            console.log('Error updating view count in getVideoById controller', viewCounterError)
        }
        
        return NextResponse.json({ video }, { status: 200 });
    } catch (error) {
        console.error("unhandled error fetching video by ID route controller:", error);
        return NextResponse.json({ message: `Internal server error` }, { status: 500 });
    }
}

export const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params;

        if (!id || id === 'undefined') {
            console.error("Invalid ID provided in video delete route controller:", id);
            return NextResponse.json({ message: "Failed to delete video" }, { status: 400 });
        }

        const supabase = await createClient()

        const { data: videoData, error: videoDataError } = await supabase.from('Videos').select('*').eq('id', id).single();
        if (videoDataError) {
            console.error("Error fetching video data for deletion in video delete route controller:", videoDataError);
            return NextResponse.json({ message: "Failed to delete video" }, { status: 400 });
        }

        const { error: deleteRowError } = await supabase.from('Videos').delete().eq('id', id);
        if (deleteRowError) {
            console.error("Error deleting video row in video delete route controller:", deleteRowError);
            return NextResponse.json({ message: "Failed to delete video" }, { status: 400 });
        }

        const { error: deleteThumbnailError } = await supabase.storage.from('Thumbnails').remove([videoData.thumbnail_path]);
        if (deleteThumbnailError) {
            console.error("Error deleting thumbnail from storage in video delete route controller:", deleteThumbnailError);
            return NextResponse.json({ message: "Failed to delete thumbnail" }, { status: 400 });
        }

        const { error: deleteVideoError } = await supabase.storage.from('Videos').remove([videoData.video_path]);
        if (deleteVideoError) {
            console.error("Error deleting video from storage in video delete route controller:", deleteVideoError);
            return NextResponse.json({ message: "Failed to delete video file" }, { status: 400 });
        }

        return NextResponse.json({ message: "Video deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting video:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}