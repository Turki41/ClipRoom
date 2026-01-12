import Header from '@/components/Header'
import React from 'react'

const page = async ({ params }: ParamsWithSearch) => {
    const {id} = await params

    return (
        <div className='wrapper page'>
            <Header subtitle='email@gmail.com' title='userName' userImg='/assets/images/dummy.jpg'/>
        </div>
    )
}

export default page