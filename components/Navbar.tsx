'use client'

import { useCheckAuthQuery } from '@/services/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null)

    const { data, isLoading } = useCheckAuthQuery()

    const router = useRouter()

    useEffect(() => {
        if (!isLoading && data) {
            setUser(data)
        }
    }, [data, isLoading])
    
    return (
        <header className='navbar'>
            <button onClick={() => console.log(user)}>user</button>
            <nav>
                <Link href={'/'}>
                    <Image src={'/assets/icons/logo.svg'} alt='Logo' width={32} height={32} />
                    <h1>ClipRoom</h1>
                </Link>

                {user && (
                    <figure>
                        <button onClick={() => router.push(`/profile/${user.id}`)}>
                            <Image src={user.profilePicture || '/assets/images/dummy.jpg'} alt='User Icon' width={36} height={36} className='rounded-full object-cover' />
                        </button>
                        <button>
                            <Image src={'/assets/icons/logout.svg'} alt='Logout' width={24} height={24} className='rotate-180' />
                        </button>
                    </figure>
                )}

                {(true) && (
                    <div>
                        <Link href={'/login'} className='login-btn'>Login</Link>
                        <Link href={'/signup'} className='signup-btn'>Sign Up</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar