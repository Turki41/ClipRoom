import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  
  const {data: videos, error} = await supabase.from('Videos').select('*, Users(userName, profilePicture)')
  
  if (error) return <p>Failed to load videos</p>

  return (
    <main className="wrapper page">
      <Header title="All Videos" subtitle="Public Library" />
      {videos?.length <= 0 ? (
        <EmptyState icon="/assets/icons/video.svg" title="No Videos Found" />
      ) : (
        <section className="video-grid">
          {videos.map((video, index) => (
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
              userId= {video.user_id}
            />
          ))}
        </section>
      )}

    </main>
  );
}
