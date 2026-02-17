'use client'

import { useSignupMutation } from "@/services/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"


const page = () => {
    const [signup, { isLoading }] = useSignupMutation()
    const router = useRouter()

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!userName.trim() || !email.trim() || !password.trim()) {
            return toast.error('Please fill in all fields.')
        }
        try {
            const userData = {
                userName,
                email,
                password
            }
            const response = await signup(userData).unwrap()
   
            router.push('/')
            toast.success('Signed up!')

        } catch (error: any) {
            return toast.error(String(error?.data?.message) || 'Something went wrong, please try again.')
        }


    }

    return (
        <main className='sign-in'>
            <section>
                <header>
                    <Link href={'/'}>
                        <Image src={'/assets/icons/logo.svg'} alt={'logo'} width={32} height={32} />
                        <h1>ClipRoom</h1>
                    </Link>

                    <p><span>Welcome!</span> <br />Create your account to begin your journey</p>
                </header>

                <form onSubmit={handleSignup}>
                    <div className="info-container">
                        <label htmlFor="username">Full Name</label>
                        <input id="username" type="text" placeholder="First Last" value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} />
                    </div>

                    <div className="info-container">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="text" placeholder="email@gmail.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    </div>

                    <div className="info-container">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="********" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" disabled={isLoading}>{isLoading ? 'Signing up...' : 'Signup'}</button>
                </form>

                <footer>
                    <p>Already have an account?</p>
                    <Link href={'/login'}>Login</Link>
                </footer>
            </section>
        </main>
    )
}

export default page