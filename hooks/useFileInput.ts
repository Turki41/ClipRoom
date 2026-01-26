import { useRef, useState } from "react";
import toast from "react-hot-toast";

export const useFileInput = (maxSize: number) => {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [duration, setDuration] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const selectedFile = e.target.files[0]

            if (selectedFile.size > maxSize) {
                toast.error(`File size exceeds the limit of ${maxSize / (1024 * 1024)} MB.`)
                return
            } else if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
                toast.error('Unsupported file type. Please select an image or video file.')
                return
            }

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }

            setFile(selectedFile)
            const objectUrl = URL.createObjectURL(selectedFile)
            setPreviewUrl(objectUrl)

            if (selectedFile.type.startsWith('video/')) {
                const video = document.createElement('video')
                video.preload = 'metadata'

                video.onloadedmetadata = () => {
                    setDuration(Math.round(video.duration) || 0)
                }

                video.src = objectUrl
            }
        }
    }

    const resetFile = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }

        setFile(null)
        setPreviewUrl('')
        setDuration(0)

        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return { file, previewUrl, duration, inputRef, handleFileChange, resetFile }
}