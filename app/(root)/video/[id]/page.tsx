'use client'

import VideoCard from '@/components/VideoCard'
import { useGetVideoByIdQuery } from '@/services/videos'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  const id = params.id

  const { data, isLoading, error } = useGetVideoByIdQuery(id, {
    skip: !id,
  })

  const video = data?.video

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load video</p>

  return (
    <div className="wrapper page">
      <p>Video ID: {id}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre >
      {video && (
        <VideoCard
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
      )}
    </div>
  )
}

export default Page
