'use client'

import EmptyState from '@/components/EmptyState'
import VideoPlayer from '@/components/VideoPlayer'
import { useGetVideoByIdQuery } from '@/services/videos'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  const videoId = params.id

  const { data, isLoading, error } = useGetVideoByIdQuery(videoId, {
    skip: !videoId,
  })

  const video = data?.video

  if (isLoading) return <p>Loading...</p>
  if (error) return (
    <div className='wrapper page'>
      <EmptyState icon='/assets/icons/video.svg' title='Video Not Found' description='The requested video was not found or is unavailable.' />
    </div>)

  return (
    <div className="wrapper page">
      <h1>{video?.title || 'Video Title'}</h1>
      <section className='video-details'>
        <div className='content'>
          <VideoPlayer url={video!.video_url} />
          
        </div>
      </section>
    </div>
  )
}

export default Page
