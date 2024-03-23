'use client'

import Link from 'next/link';
import Image from "next/image";
import React, { useEffect, useState } from 'react'

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPisiton = window.scrollY;
            const windowHeight = window.innerHeight;
            const oneThirdOfPage = windowHeight / 4;

            if (scrollPisiton >= oneThirdOfPage) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Link 
        href=""
        onClick={scrollToTop} className={`border-4 border-black rounded-full bg-white opacity-60 transition ease-in-out hover:opacity-80 hover:scale-110 ${showButton ? 'block' : 'hidden'} `}>
            <Image src="/assets/images/arrow.png" alt="Scroll to top button"
            height={40}
            width={40} />
        </Link>
    )
}

export default ScrollToTopButton;
