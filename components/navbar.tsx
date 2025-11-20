// components/navbar.tsx
"use client";

import {useEffect, useState, useRef} from "react";
import {FaInfinity} from "react-icons/fa6";
import {HiOutlineMenu} from "react-icons/hi";
import type {Links} from "@/types/links";
import Link from "next/link";

const HOVER_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateHoverRandom(charset: string) {
    const idx = Math.floor(Math.random() * charset.length);
    return charset.charAt(idx);
}

function HoverEncryptedLink({text, href, className}: {text: string; href: string; className?: string}) {
    const [displayChars, setDisplayChars] = useState<string[]>(() => text.split(""));
    const rafRef = useRef<number | null>(null);
    const lastFlipRef = useRef<number>(0);
    const startRef = useRef<number>(0);

    useEffect(() => {
        // Keep display in sync if text prop changes
        setDisplayChars(text.split(""));
    }, [text]);

    useEffect(() => {
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const start = () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        startRef.current = performance.now();
        lastFlipRef.current = startRef.current;

        const total = text.length;
        const revealDelay = 45; // ms per character reveal
        const flipDelay = 40; // ms between random flips

        const loop = (now: number) => {
            const elapsed = now - startRef.current;
            const revealCount = Math.min(total, Math.floor(elapsed / Math.max(1, revealDelay)));

            // create new array from current display
            const arr = displayChars.slice();
            const timeSinceLast = now - lastFlipRef.current;
            if (timeSinceLast >= Math.max(0, flipDelay)) {
                for (let i = 0; i < total; i += 1) {
                    if (i >= revealCount) {
                        arr[i] = text[i] === ' ' ? ' ' : generateHoverRandom(HOVER_CHARSET);
                    } else {
                        arr[i] = text[i];
                    }
                }
                lastFlipRef.current = now;
                setDisplayChars(arr);
            }

            if (revealCount < total) {
                rafRef.current = requestAnimationFrame(loop);
            } else {
                // fully revealed
                setDisplayChars(text.split(""));
                rafRef.current = null;
            }
        };

        rafRef.current = requestAnimationFrame(loop);
    };

    const stop = () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        setDisplayChars(text.split(""));
    };

    return (
        <a href={href}
           onMouseEnter={() => start()}
           onFocus={() => start()}
           onMouseLeave={() => stop()}
           onBlur={() => stop()}
           className={className}
           aria-label={text}
        >
            {displayChars.map((c, i) => (
                <span key={`${i}-${text[i]}`}>{c}</span>
            ))}
        </a>
    );
}

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const link: Links[] = [{
        name: "Home", href: "#home",
    }, {
        name: "About", href: "#about",
    }, {
        name: "Projects", href: "#projects",
    }, {
        name: "Contact", href: "#contact",
    },]

    const baseClasses = "duration-300 fixed inset-x-0 top-6 transition-all z-50 w-full";
    const scrolledClasses = "backdrop-blur-md border border-white/20 bg-white/10";
    const idleClasses = "bg-transparent border-none";

    return (<nav
        className={`${baseClasses} ${scrolled ? scrolledClasses : idleClasses} container mx-auto flex w-full items-center justify-between rounded-xl px-6 py-4`}>
        {/* Logo */}
        <div className="flex items-center">
            <Link href={"https://polarisdev.fr"}>
                <FaInfinity className="text-2xl text-white"/>
            </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden space-x-8 font-light text-white/80 md:flex">
            {link.map((item, index) => (
                <HoverEncryptedLink key={item.name ?? index} text={item.name} href={item.href} className="transition-colors hover:text-white" />))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
            <HiOutlineMenu className="text-2xl text-white"/>
        </div>
    </nav>);
};