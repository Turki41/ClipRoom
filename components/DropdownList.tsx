'use client'

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const DropdownList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') || 'Most Recent';

    const handleOpenList = () => {
        setIsOpen(!isOpen);
    }

    const handleSortChange = (sortOption: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', sortOption);
        router.push(`?${params.toString()}`);
        setIsOpen(false);
    }

    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={() => handleOpenList()}>
                <div className="filter-trigger">
                    <figure>
                        <Image src={'/assets/icons/hamburger.svg'} alt="menu" width={14} height={14} />
                        {currentSort}
                    </figure>
                    <Image src={'/assets/icons/arrow-down.svg'} alt="arrow down" width={20} height={20} />
                </div>
            </div>

            {isOpen && (
                <ul className="dropdown">
                    {['Most Recent', 'Most Viewed'].map((item) => (
                        <li key={item} className="list-item" onClick={() => handleSortChange(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropdownList