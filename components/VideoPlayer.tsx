'use client'

import dynamic from 'next/dynamic'
import "plyr-react/plyr.css"

const Plyr = dynamic(() => import('plyr-react').then(mod => mod.Plyr), { ssr: false })

const VideoPlayer = ({ url }: { url: string }) => {
    return (
        <div className='rounded-xl overflow-hidden'>
            <Plyr source={{
                type: 'video',
                sources: [{ src: url, type: "video/mp4" }]
            }} />
        </div>
    )
}

export default VideoPlayer