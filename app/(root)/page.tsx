import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { createClient } from "@/utils/supabase/server";

export default async function Home({ searchParams }: { searchParams: Promise<{ search?: string; sort?: string }> }) {
  const supabase = await createClient()
  const { search, sort } = await searchParams

  const { data: videos, error } = await supabase.from('Videos').select('*, Users(userName, profilePicture)')

  if (error) return <p>Failed to load videos</p>

  let filteredVideos = videos?.filter(video => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      video.title.toLowerCase().includes(searchLower) ||
      video.Users?.userName?.toLowerCase().includes(searchLower)
    )
  }) || []

  const sortOption = sort || 'Most Recent'

  if (sortOption === 'Most Recent') {
    filteredVideos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else if (sortOption === 'Most Viewed') {
    filteredVideos.sort((a, b) => (b.views || 0) - (a.views || 0))
  }

  return (
    <main className="wrapper page">
      <Header title="All Videos" subtitle="Public Library" />
      {filteredVideos?.length <= 0 ? (
        <EmptyState icon="/assets/icons/video.svg" title="No Videos Found" />
      ) : (
        <section className="video-grid">
          {filteredVideos.map((video, index) => (
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
              userId={video.user_id}
            />
          ))}
        </section>
      )}

    </main>
  );
}
