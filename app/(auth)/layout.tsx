import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='auth-layout'>
      <aside className='testimonial'>
        <header>
          <Link href={'/'}>
            <Image src={'/assets/icons/logo.svg'} alt={'logo'} width={32} height={32} />
            <h1>ClipRoom</h1>
          </Link>
        </header>

        <div className='description'>
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image src={'/assets/icons/star.svg'} alt='star' width={20} height={20} key={index} />
              ))}
            </figure>
            <p>ClipRoom is your all-in-one space to capture your screen, record clips, and host your videos effortlessly. ClipRoom makes recording and sharing simple, fast, and organized.</p>
          </section>
        </div>

        <footer>
          <p>©ClipRoom. {new Date().getFullYear()}</p>
        </footer>
      </aside>

      <aside>
        {children}
      </aside>
      
      <div className='decorator'/>
    </main>
  )
}

export default layout