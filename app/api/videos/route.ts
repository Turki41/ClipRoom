import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const supabase = await createClient()

        const {data: videos, error: videosError} = await supabase.from('Videos').select('*, Users(userName, profilePicture)').order('created_at', { ascending: false })

        if (videosError) {
            console.error('Error fetching videos in get videos api controller:', videosError)
            return new Response(JSON.stringify({ message: 'Failed to load videos' }), { status: 500 })
        }

        return NextResponse.json({ videos }, { status: 200 });
    } catch (error) {
        console.error('Unexpected error in get videos api controller:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}