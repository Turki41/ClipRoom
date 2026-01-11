'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()

    const user = {}

    return (
        <header className='navbar'>
            <nav>
                <Link href={'/'}>
                    <Image src={'/assets/icons/logo.svg'} alt='Logo' width={32} height={32} />
                    <h1>ClipRoom</h1>
                </Link>

                {user && (
                    <figure>
                        <button onClick={() => router.push('/profile/:id')}>
                            <Image src={'/assets/images/dummy.jpg'} alt='User Icon' width={36} height={36} className='rounded-full object-cover' />
                        </button>
                        <button>
                            <Image src={'/assets/icons/logout.svg'} alt='Logout' width={24} height={24} className='rotate-180' />
                        </button>
                    </figure>
                )}
            </nav>
        </header>
    )
}

export default Navbar