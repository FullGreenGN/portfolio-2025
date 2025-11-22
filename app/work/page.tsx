"use client"
import Link from "next/link";
import projects from "@/features/work/projects";
import {FocusCard} from "@/components/ui/focus-card";
import {useState} from "react";

export default function WorkIndex() {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const list = Array.isArray(projects) ? projects : [projects];

    return (<main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-32">
            <section className="container mx-auto px-6 py-20">
                <h1 className="mb-8 font-bold text-3xl">Projects</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {list.map((p) => (<Link key={p.slug} href={`/work/${p.slug}`}>
                            <FocusCard card={{src: p.coverImage, title: p.title}} index={0} hovered={isHovered}
                                       setHovered={setIsHovered}/>
                        </Link>))}
                </div>
            </section>
        </main>);
}
