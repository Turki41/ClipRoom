'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import DropdownList from "./DropdownList"
import RecordScreen from "./RecordScreen"

const Header = ({ title, subtitle, userImg }: HeaderProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentSearch = searchParams.get('search') || ''

    const handleSearch = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const query = (e.target as HTMLInputElement).value.trim()
            const params = new URLSearchParams(searchParams)
            
            if (query) {
                params.set('search', query)
            } else {
                params.delete('search')
            }
            
            router.push(`?${params.toString()}`)
        }
    }, [router, searchParams])

    return (
        <header className="header">
            <section className="header-container">
                <div className="details">
                    {userImg && (
                        <Image src={userImg} alt="User Icon" width={66} height={66} className="rounded-full" />
                    )}

                    <article>
                        <p>{subtitle}</p>
                        <h1>{title}</h1>
                    </article>
                </div>

                <aside>
                    <Link href={'/upload'}>
                        <Image src={'/assets/icons/upload.svg'} alt="Upload" width={16} height={16} />
                        <span>Upload a video</span>
                    </Link>

                    <RecordScreen />
                </aside>

            </section>

            <section className="search-filter">
                <div className="search">
                    <input 
                        type="text" 
                        placeholder="Search for videos or users..." 
                        defaultValue={currentSearch}
                        onKeyDown={handleSearch}
                    />
                    <Image src={'/assets/icons/search.svg'} alt="Search" width={16} height={16} />
                </div>

                <DropdownList />
            </section>
        </header>
    )
}

export default Header