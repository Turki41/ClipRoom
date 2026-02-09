import EmptyState from '@/components/EmptyState'
import VideoDescription from '@/components/VideoDescription'
import VideoDetailsHeader from '@/components/VideoDetailsHeader'
import VideoPlayer from '@/components/VideoPlayer'
import { useGetVideoByIdQuery } from '@/services/videos'
import { createClient } from '@/utils/supabase/server'

const Page = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params
  
  const supabase = await createClient()

  const {data: video, error} = await supabase.from('Videos').select('*, Users(userName, profilePicture)').eq('id', id).single()

  if (error || !video) return (
    <div className='wrapper page'>
      <EmptyState icon='/assets/icons/video.svg' title='Video Not Found' description='The requested video was not found or is unavailable.' />
    </div>)

  return (
    <div className="wrapper-lg page">
      <section className='video-details'>
        <div className='content'>
          <VideoDetailsHeader video={video} />
          <VideoPlayer url={video!.video_url} />
          <VideoDescription description={video.description} />
        </div>
      </section>
    </div>
  )
}

export default Page
