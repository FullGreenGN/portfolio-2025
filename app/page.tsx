"use client"
import { GLSLHills } from "@/features/landing/hero";
import {FocusCard} from "@/components/ui/focus-card";
import ContactSection from "@/features/contact/contact-section";
import Link from "next/link";
import projects from "@/features/work/projects";
import {useState} from "react";


export default function Home() {
 	return (
 		<main id="home">
             <GLSLHills />

 			{/* project sections */}
 			<section id="projects">
 				<div className={"container mx-auto flex min-h-screen w-full flex-col items-start justify-start px-6 py-32"}>
 					<h2 className={"mb-10 font-semibold text-4xl text-white"}>Projects</h2>
					<FocusCardsDemo />
 				</div>
 			</section>
            <section id="contact" className={"w-full"}>
                <ContactSection />
            </section>
 		</main>
 	);
}


export function FocusCardsDemo() {
    const [hovered, setHovered] =  useState<number | null>(null);

    // `projects` can be a single project object or an array of projects.
    const items = Array.isArray(projects) ? projects : [projects];

    return (
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:px-8">
            {items.map((rp, idx) => (
                <Link key={rp.slug} href={`/work/${rp.slug}`} className="block">
                    <FocusCard card={{src: rp.coverImage || '/img.png', title: rp.title}} index={idx} hovered={hovered}
                               setHovered={setHovered}/>
                </Link>
            ))}
        </div>
    );
}
