'use client'

import { useCheckAuthQuery, useLogoutMutation } from '@/services/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import toast from 'react-hot-toast'

const Navbar = () => {

    const { data: user, isLoading } = useCheckAuthQuery()
    const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout().unwrap()

            toast.success('Logged out!')
            router.push('/login')

        } catch (error) {
            return toast.error('Failed to log out, please try again.')
        }
    }
    return (
        <header className='navbar'>
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
                        <button onClick={handleLogout} disabled={isLogoutLoading}>
                            <Image src={'/assets/icons/logout.svg'} alt='Logout' width={24} height={24} className='rotate-180' />
                        </button>
                    </figure>
                )}

                {(!user && !isLoading) && (
                    <div className='nav-btns-container'>
                        <Link href={'/login'} className='login-btn'>Login</Link>
                        <Link href={'/signup'} className='signup-btn'>Sign Up</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar