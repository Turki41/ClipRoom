'use client'

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ICONS } from '@/constants'
import { setFile } from '@/features/video/videoSlice';
import { saveVideo } from '@/utils/saveVideo';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactMediaRecorder = dynamic(
    () => import('react-media-recorder').then(mod => mod.ReactMediaRecorder),
    { ssr: false }
);

const RecordScreen = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [videoURL, setVideoURL] = useState<string | null>(null);

    const dispatch = useAppDispatch()

    const handleSaveVideo = async (blobUrl: string) => {
        if (!blobUrl) return

        const blob: Blob = await fetch(blobUrl).then(res => res.blob())
        saveVideo({ blobUrl, blob })
    }

    const getVideoDuration = (blob: Blob): Promise<number> => {
        return new Promise((resolve) => {
            const video = document.createElement('video')
            const url = URL.createObjectURL(blob)
            video.src = url
            video.onloadedmetadata = () => {
                URL.revokeObjectURL(url)
                resolve(Math.round(video.duration) || 0)
            }
        })
    }

    const handleUploadVideo = async (blobUrl: string) => {
        if (!blobUrl) return

        const blob: Blob = await fetch(blobUrl).then(res => res.blob())
        const duration = await getVideoDuration(blob)
        const file = new File([blob], `recording-${new Date().toDateString()}.mp4`, { type: 'video/mp4' })
        dispatch(setFile({ file, duration }))

        router.push('/upload')
    }

    const getInstructions = (status: string) => {
        switch (status) {
            case 'idle':
                return 'Click the record button to start recording your screen';
            case 'recording':
                return 'Recording in progress... Click the stop button to finish.';
            case 'stopped':
                return 'Recording stopped. You can save or upload your video.';
            default:
                return '';
        }
    }

    return (
        <div className="record">
            <button className="primary-btn" onClick={() => setIsOpen(true)}>
                <Image src={ICONS.record} alt="Record" width={16} height={16} />
                <span>Record a video</span>
            </button>

            <ReactMediaRecorder
                screen
                audio
                onStop={(blobUrl, blob) => { setVideoURL(blobUrl); setIsOpen(true) }}
                render={({ status, startRecording, stopRecording, mediaBlobUrl, }) => (
                    <>
                        {isOpen && (
                            <section className='modal'>
                                <div className='overlay-record' onClick={() => setIsOpen(false)}>
                                    <div className='record-modal-content' onClick={(e) => { e.stopPropagation() }}>
                                        <div className="recorder">
                                            <div className="logo-container">
                                                <Image src={'/assets/icons/logo.svg'} alt='Logo' width={32} height={32} />
                                                <h1>ClipRoom</h1>
                                            </div>

                                            <div className="record-btn-container">
                                                <p>{getInstructions(status)}</p>
                                                {status !== "recording" ? (
                                                    <div className='record-btns'>
                                                        {status !== 'stopped' &&
                                                            <button className="primary-btn" onClick={() => { startRecording(); setIsOpen(false); }}>
                                                                <p>Start Recording</p>
                                                            </button>}
                                                        {(status === 'stopped') && (
                                                            <div className='save-upload-btns'>
                                                                <button className="primary-btn" onClick={() => { handleSaveVideo(mediaBlobUrl || ''); setIsOpen(false) }}>
                                                                    <p>Save</p>
                                                                </button>
                                                                <button className="primary-btn" onClick={() => { handleUploadVideo(mediaBlobUrl || ''); setIsOpen(false) }}>
                                                                    <p>Upload</p>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <button className="primary-btn" onClick={stopRecording}>
                                                        <p>Stop Recording</p>
                                                    </button>
                                                )}
                                            </div>
                                            <p>Status: {status}</p>

                                            {status === 'stopped' && (
                                                <button onClick={() => { setIsOpen(false); startRecording(); }}>
                                                    Restart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                )}
            />
        </div>
    )
}

export default RecordScreen