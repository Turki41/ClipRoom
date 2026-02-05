'use client';

import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { useGetVideosQuery } from "@/services/videos";

export default function Home() {
  //TODO: fetch videos in server.
  const { data, isLoading, error } = useGetVideosQuery()
  const videosArray = data?.videos || []

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load videos</p>

  return (
    <main className="wrapper page">
      <Header title="All Videos" subtitle="Public Library" currentUser={true} />

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
  );
}
