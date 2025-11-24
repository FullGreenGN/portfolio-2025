// components/navbar.tsx
"use client";

import {useEffect, useState} from "react";
import {FaInfinity} from "react-icons/fa6";
import {HiOutlineMenu} from "react-icons/hi";
import type {Links} from "@/types/links";
import Link from "next/link";
import {HoverEncryptedLink} from "@/components/ui/encrypted-hover-text";
import {Sheet, SheetContent, SheetFooter, SheetTrigger} from "@/components/ui/sheet";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const link: Links[] = [{
        name: "Home", href: "/",
    }, {
        name: "Projects", href: "#projects",
    }, {
        name: "Contact", href: "#contact",
    }]

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
                <HoverEncryptedLink key={item.name ?? index} text={item.name} href={item.href} className="transition-colors hover:text-white" />
            ))}
        </div>

        <MobileNavbar links={link}/>
    </nav>);
};

function MobileNavbar({links}: {links: Links[]}) {
    return (
        <Sheet>
            <SheetTrigger className={"md:hidden"}>
                <HiOutlineMenu className="text-2xl text-white"/>
            </SheetTrigger>
            <SheetContent>
                <div className="mt-10 ml-4 flex flex-col gap-6">
                    {links.map((item, index) => (
                        <Link href={item.href} key={item.name ?? index} className="font-medium text-lg text-white/90 hover:text-white">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <SheetFooter>
                    <div className="mb-6 ml-4 text-white/70">© {new Date().getFullYear()} Jean‑Luc O.</div>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    )
}