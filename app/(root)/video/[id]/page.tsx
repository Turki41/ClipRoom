'use client'

import { useGetVideoByIdQuery } from '@/services/videos'
import { useParams } from 'next/navigation'

const page = () => {
  const params = useParams()
  const videoId = params.id as string
  const { data, isLoading, error } = useGetVideoByIdQuery(videoId)

  if (isLoading) return <p>Loading...</p>
  /* if (error) return <p>Failed to load video {JSON.stringify(error)}</p> */
  return (
    <div className='wrapper page'>
      <button>video</button>
      <p>{videoId}</p>
      <p>{data ? JSON.stringify(data)  : 'No video data available'}</p>
    </div>
  )
}

export default page