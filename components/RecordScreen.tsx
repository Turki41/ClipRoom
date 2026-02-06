'use client'

import { ICONS } from '@/constants'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

const RecordScreen = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [videoURL, setVideoURL] = useState<string | null>(null);

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
                render={({ status, startRecording, stopRecording }) => (
                    <>
                        {isOpen && (
                            <section className='modal'>
                                <div className='overlay-record' onClick={() => setIsOpen(false)}>
                                    <div className='record-modal-content' onClick={(e) => { e.stopPropagation() }}>
                                        <div className="recorder">
                                            <div className="logo-container">
                                                <Image src={'/assets/icons/logo.svg'} alt='Logo' width={32} height={32} />
                                                <h1 className="text-xl font-black font-satoshi -tracking-[0.1px]">ClipRoom</h1>
                                            </div>

                                            <div className="record-btn-container">
                                                <p>Click the record button to start recording your screen</p>
                                                {status !== "recording" ? (
                                                    <div className='record-btns'>
                                                        {status !== 'stopped' &&
                                                            <button className="primary-btn" onClick={() => { startRecording(); setIsOpen(false); }}>
                                                                <p>Start Recording</p>
                                                            </button>}
                                                        {(status === 'stopped') && (
                                                            <div className='save-upload-btns'>
                                                                <button className="primary-btn" onClick={() => { setIsOpen(false); }}>
                                                                    <p>Save</p>
                                                                </button>
                                                                <button className="primary-btn">
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