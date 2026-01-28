'use client';

import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";
import { useGetVideosQuery } from "@/services/videos";

export default function Home() {
  //TODO: fetch videos in server.
  const { data: videos, isLoading, error } = useGetVideosQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load videos</p>

  return (
    <main className="wrapper page">
      <Header title="All Videos" subtitle="Public Library" />
      <button onClick={() => console.log(videos)}>videos</button>
      <section className="video-grid">
        {videos && dummyCards.map((videos, index) => (
          <VideoCard {...videos} key={index} />
        ))}
      </section>

    </main>
  );
}
