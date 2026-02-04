'use client'

import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import { dummyCards } from '@/constants'
import { useGetVideosByUserIdQuery } from '@/services/videos'
import { useParams } from 'next/navigation'

const page = () => {
    const params = useParams()
    const userId = params.id

    //TODO: fetch videos in server.
    const { data, isLoading, error } = useGetVideosByUserIdQuery(userId, {
        skip: !userId,
    })

    const videosArray = data || []

    if (isLoading) return <p>Loading...</p>
    if (error) return (
        <div className='wrapper page'>
            <EmptyState icon='/assets/icons/video.svg' title='Video Not Found' description='The requested video was not found or is unavailable.' />
        </div>)

    return (
        <main className="wrapper page">
            <Header title="All Videos" subtitle="Public Library" />
            <button onClick={() => console.log(videosArray)}>videos</button>

            {videosArray?.length <= 0 ? (
                <EmptyState icon="/assets/icons/video.svg" title="No Videos Found" />
            ) : (
                <section className="video-grid">
                    {videosArray.map((video, index) => (
                        <VideoCard
                            key={index}
                            id={video.id}
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