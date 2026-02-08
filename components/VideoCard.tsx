'use client"'

import { useCheckAuthQuery } from "@/services/auth";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

const VideoCard = ({ id, userId, title, thumbnail, userImg, username, createdAt, views, visibility, duration }: VideoCardProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyVideoUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigator.clipboard.writeText(`${window.location.origin}/video/${id}`)

        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDeleteVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const { data: currentUserData } = useCheckAuthQuery()

    return (
        <Link href={`/video/${id}`} className="video-card">
            <Image src={thumbnail} alt="thumbnail" width={290} height={160} className="thumbnail" />
            <article>
                <div>
                    <figure>
                        <Image src={userImg || '/assets/images/dummy.jpg'} alt="Avatar" width={34} height={34} className="rounded-full" />
                        <figcaption>
                            <h3>{username}</h3>
                            <p>{visibility}</p>
                        </figcaption>
                    </figure>

                    <aside>
                        <Image src="/assets/icons/eye.svg" alt="views" width={16} height={16} />
                        <span>{views}</span>
                    </aside>
                </div>

                <div className="flex-col gap-0">
                    <h2>{title}</h2>
                    <p>{createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
            </article>

            <button className="copy-btn" onClick={handleCopyVideoUrl} disabled={copied} >
                <Image src={copied ? "/assets/images/checked.png" : "/assets/icons/link.svg"} alt={copied ? "link copied" : "copy link"} width={18} height={18} />
            </button>
            {currentUserData?.id === userId &&
                <button className='delete-btn' onClick={handleDeleteVideo}>
                    <Image src="/assets/icons/delete.svg" alt="delete" width={18} height={18} />
                </button>
            }

            {duration && (
                <div className="duration">
                    {Math.ceil(duration / 60)}min
                </div>
            )}
        </Link>
    )
}

export default VideoCard