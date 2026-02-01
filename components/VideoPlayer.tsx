import { Plyr } from "plyr-react"
import "plyr-react/plyr.css"


const VideoPlayer = ({ url }: { url: string }) => {
    return (
        <Plyr source={{
            type: 'video',
            sources: [{ src: url, type: "video/mp4" }]
        }} />
    )
}

export default VideoPlayer