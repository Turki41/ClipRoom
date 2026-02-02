'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const VideoDetailsHeader = ({video}: {video: Video}) => {
    const [copied, setCopied] = useState(false)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/video/${video.id}`)

        setCopied(true)
        setTimeout(() => setCopied(false), 2000) 
    }

    return (
        <header className='details-header'>
            <aside className='user-info'>
                <h1>{video.title}</h1>
                <figure>
                    <Link href={`/profile/${video.user_id}`}>
                        <Image src={video.Users.profilePicture || '/assets/images/dummy.jpg'} alt='User profile picture' width={24} height={24} />
                        <h2>{video.Users.userName}</h2>
                    </Link>
                    <figcaption>
                        <span>&#8226;</span>
                        <p>{new Date(video.created_at).toLocaleDateString()}</p>
                    </figcaption>
                </figure>
            </aside>

            <aside>
                <button onClick={handleCopyLink} disabled={copied} >
                    <Image src={copied ? "/assets/images/checked.png" : "/assets/icons/link.svg"} alt={copied ? "link copied" : "copy link"} width={24} height={24} />
                </button>
            </aside>
        </header>
    )
}

export default VideoDetailsHeader