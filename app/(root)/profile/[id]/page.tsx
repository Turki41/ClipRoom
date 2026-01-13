import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import { dummyCards } from '@/constants'
import React from 'react'

const page = async ({ params }: ParamsWithSearch) => {
    const { id } = await params

    return (
        <div className='wrapper page'>
            <Header subtitle='email@gmail.com' title='userName' userImg='/assets/images/dummy.jpg' />

            <section className='video-grid'>
                {dummyCards.map((card, index) => (
                    <VideoCard {...card} key={index} />
                ))}
            </section>
        </div>
    )
}

export default page