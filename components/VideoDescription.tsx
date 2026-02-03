'use client'

import { useState } from "react";

const VideoDescription = ({ description }: { description: string }) => {
    const [open, setOpen] = useState(false);

    const handleOpenDescription = () => {
        setOpen(!open);
    }

    return (
        <section onClick={handleOpenDescription} className="video-description">
            <h1>Description</h1>
            <p className={`${open ? 'line-clamp-none' : 'line-clamp-2'}`}>{description}</p>  
        </section>
    )
}

export default VideoDescription