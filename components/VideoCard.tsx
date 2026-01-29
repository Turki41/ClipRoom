'use client"'

import Image from "next/image"
import Link from "next/link"

const VideoCard = ({ id, title, thumbnail, userImg, username, createdAt, views, visibility, duration }: VideoCardProps) => {
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

            <button className="copy-btn">
                <Image src={'/assets/icons/link.svg'} alt="copy link" width={18} height={18} />
            </button>

            {duration && (
                <div className="duration">
                    {Math.ceil(duration / 60)}min
                </div>
            )}
        </Link>
    )
}

export default VideoCard