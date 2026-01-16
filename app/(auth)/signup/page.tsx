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

                    <p><span>Welcome!</span> <br />Create your account to begin your journey</p>
                </header>

                <form>
                    <div className="info-container">
                        <label htmlFor="username">Full Name</label>
                        <input id="username" type="text" placeholder="First Last"/>
                    </div>

                    <div className="info-container">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="text" placeholder="email@gmail.com"/>
                    </div>

                    <div className="info-container">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="********"/>
                    </div>

                    <button type="submit">Signup</button>
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