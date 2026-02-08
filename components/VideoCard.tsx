'use client'

import { useCheckAuthQuery } from "@/services/auth";
import { useDeleteVideoMutation } from "@/services/videos";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import toast from "react-hot-toast";

const VideoCard = ({ id, userId, title, thumbnail, userImg, username, createdAt, views, visibility, duration }: VideoCardProps) => {
    const [deleteVideo, { isLoading }] = useDeleteVideoMutation()

    const [copied, setCopied] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleCopyVideoUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigator.clipboard.writeText(`${window.location.origin}/video/${id}`)

        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDeleteVideo = async (id: string) => {
        try {
            await deleteVideo(id).unwrap()

            toast.success("Video deleted successfully")
        } catch (error) {
            return toast.error("Failed to delete video")
        } finally {
            setIsDeleteModalOpen(false)
        }
    }

    const { data: currentUserData } = useCheckAuthQuery()

    return (
        <>
            {isDeleteModalOpen && <DeleteModal onClose={() => setIsDeleteModalOpen(false)} onConfirm={() => handleDeleteVideo(id)} isLoading={isLoading} />}
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
                    <div className='delete-btn' onClick={(e) => { setIsDeleteModalOpen(true); e.preventDefault() }}>
                        <Image src="/assets/icons/delete.svg" alt="delete" width={18} height={18} />
                    </div>
                }

                {duration && (
                    <div className="duration">
                        {Math.ceil(duration / 60)}min
                    </div>
                )}
            </Link>
        </>
    )
}

export default VideoCard

const DeleteModal = ({ onClose, onConfirm, isLoading }: { onClose: () => void, onConfirm: () => void, isLoading: boolean }) => {

    return (
        <div className="modal z-50">
            <div className="overlay-record" onClick={onClose}>
                <div className="record-modal-content flex-col" onClick={(e) => { e.stopPropagation() }}>
                    <div>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this video? This action cannot be undone.</p>
                    </div>

                    <div className="delete-modal-btns">
                        <button className="secondary-btn" onClick={onClose} disabled={isLoading}>Cancel</button>
                        <button className="primary-btn" onClick={onConfirm} disabled={isLoading}>{isLoading ? 'Deleting...' : 'Delete'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}