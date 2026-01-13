import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";

export default function Home() {
  return (
    <main className="wrapper page">
      <Header title="All Videos" subtitle="Public Library"/>

      <h1 className="underline text-red-500 font-satoshi">Welcome to Cliproom</h1>

      <section className="video-grid">
      {dummyCards.map((card, index) => (
        <VideoCard {...card} key={index}/>
      ))}
      </section>

    </main>
  );
}
