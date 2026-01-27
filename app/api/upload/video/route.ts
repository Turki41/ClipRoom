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

        const supabase = await createClient()

        // Auth check (get user id)
        const { data: authData } = await supabase.auth.getUser()
        const user = authData.user
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }


        if (!(video instanceof File) || !(thumbnail instanceof File)) {
            return NextResponse.json({ message: 'Invalid video or thumbnail file' }, { status: 400 })
        }

        // upload video
        const { data: videoData, error: videoError } = await supabase.storage.from('Videos').upload(`videos/${Date.now()}_${video.name}`, video)

        if (videoError) {
            console.error('Error uploading video in upload video api controller:', videoError)
            return NextResponse.json({ message: 'Failed to upload' }, { status: 500 })
        }

        // upload thumbnail
        const { data: thumbnailData, error: thumbnailError } = await supabase.storage.from('Thumbnails').upload(`thumbnails/${Date.now()}_${thumbnail.name}`, thumbnail)

        if (thumbnailError) {
            console.error('Error uploading thumbnail in upload video api controller:', thumbnailError)

            const { error } = await supabase.storage.from('Videos').remove([videoData.path]) // rollback video upload
            if (error) {
                console.error('Error rolling back video upload after thumbnail upload failure:', error)
            }

            return NextResponse.json({ message: 'Failed to upload' }, { status: 500 })
        }

        const { data: signedVideo } = await supabase.storage.from('Videos').createSignedUrl(videoData.path, 60 * 60 * 24 * 365) // 1 year expiry
        const { data: signedThumbnail } = await supabase.storage.from('Thumbnails').createSignedUrl(thumbnailData.path, 60 * 60 * 24 * 365) // 1 year expiry


        // store video metadata in db
        const { data: videoMetaData, error: videoMetaError } = await supabase.from('Videos').insert({
            user_id: user.id,
            title,
            description,
            visibility,
            video_url: signedVideo?.signedUrl,
            thumbnail_url: signedThumbnail?.signedUrl,
            duration: duration,
        })

        if (videoMetaError) {
            console.error('Error storing video metadata in upload video api controller:', videoMetaError)
            return NextResponse.json({ message: 'Failed to upload' }, { status: 400 })
        }

        return NextResponse.json({ message: { success: true } }, { status: 201 })

    } catch (error) {
        console.error('Error uploading video in upload video api controller:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}