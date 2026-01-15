import Image from "next/image"
import Link from "next/link"

const page = () => {
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

                <form>
                    <div className="info-container">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="text" />
                    </div>

                    <div className="info-container">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" />
                    </div>

                    <button type="submit">Sign In</button>
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