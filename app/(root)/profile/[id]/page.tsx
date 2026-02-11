import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import { createClient } from '@/utils/supabase/server'

const page = async ({params, searchParams}: {params: Promise<{id: string}>, searchParams: Promise<{search?: string}>}) => {
    const {id} = await params
    const {search} = await searchParams

    const supabase = await createClient()

    const {data: userVideos, error} = await supabase.from('Videos').select('*, Users(id, userName, profilePicture)').eq('user_id', id)
    const user = userVideos?.[0]?.Users

    if (error) return (
        <div className='wrapper page'>
            <EmptyState icon='/assets/icons/video.svg' title='Video Not Found' description='The requested video was not found or is unavailable.' />
        </div>)

    const filteredVideos = userVideos?.filter(video => {
        if (!search) return true
        
        const searchLower = search.toLowerCase()
        return (
            video.title.toLowerCase().includes(searchLower) ||
            video.Users?.userName?.toLowerCase().includes(searchLower)
        )
    }) || []

    return (
        <main className="wrapper page">
            <Header title={user?.userName || "All Videos"} subtitle={"User Library"} userImg={user?.profilePicture || '/assets/images/dummy.jpg'}/>

            {filteredVideos?.length <= 0 ? (
                <EmptyState icon="/assets/icons/video.svg" title="No Videos Found" />
            ) : (
                <section className="video-grid">
                    {filteredVideos.map((video, index) => (
                        <VideoCard
                            key={index}
                            id={video.id}
                            userId={user.id}
                            title={video.title}
                            thumbnail={video.thumbnail_url}
                            userImg={video.Users?.profilePicture || ''}
                            username={video.Users?.userName || ''}
                            duration={parseInt(video.duration)}
                            visibility={video.visibility}
                            views={video.views}
                            createdAt={new Date(video.created_at)}
                        />
                    ))}
                </section>
            )}

        </main>
    )
}

export default page