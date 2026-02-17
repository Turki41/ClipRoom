'use client'

import { useLoginMutation } from "@/services/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const page = () => {
    const [login, { isLoading }] = useLoginMutation()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!email.trim() || !password.trim()) {
            return toast.error('Please fill in all fields.')
        }

        try {
            const loginData = {
                email,
                password
            }
            const response = await login(loginData).unwrap()
            console.log('Login successful:', response)
            
            router.push('/')
            toast.success('Logged in!')
            
        } catch (error: any) {
            return toast.error(error?.data?.message || 'Something went wrong, please try again.')
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

                    <p><span>Welcome back!</span> <br />Sign in to your account to continue</p>
                </header>

                <form onSubmit={handleLogin}>
                    <div className="info-container">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="text" placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="info-container">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
                </form>

                <footer>
                    <p>Don't have an account?</p>
                    <Link href={'/signup'}>Sign Up</Link>
                </footer>
            </section>
        </main>
    )
}

export default page