import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData()
        const title = formData.get('title')
        const description = formData.get('description')
        const visibility = formData.get('visibility')
        const video = formData.get('video')
        const thumbnail = formData.get('thumbnail')
        const duration = formData.get('duration')

        // upload video to bucket -> upload thumbnail to bucket -> store video metadata in db (with urls to video and thumbnail from the bucket)

        const supabase = await createClient()

        if (!(video instanceof File) || !(thumbnail instanceof File)) {
            return NextResponse.json({message: 'Invalid video or thumbnail file'}, {status: 400})
        }

        // upload video
        const { data: videoData, error: videoError } = await supabase.storage.from('Videos').upload(`videos/${Date.now()}_${video.name}`, video)

        if (videoError) {
            console.error('Error uploading video in upload video api controller:', videoError)
            return NextResponse.json({message: 'Failed to upload video'}, {status: 500})
        }

        // upload thumbnail
        const { data: thumbnailData, error: thumbnailError } = await supabase.storage.from('Thumbnails').upload(`thumbnails/${Date.now()}_${thumbnail.name}`, thumbnail)

        if (thumbnailError) {
            console.error('Error uploading thumbnail in upload video api controller:', thumbnailError)
            return NextResponse.json({message: 'Failed to upload thumbnail'}, {status: 500})
        }

        return NextResponse.json({message: {success: true}}, {status: 200})
    } catch (error) {
        console.error('Error uploading video in upload video api controller:', error)
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
    }
}