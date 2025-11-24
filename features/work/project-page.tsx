"use client"
import Link from "next/link"
import Image from "next/image"
import {ExternalLink, Play} from "lucide-react"
import {FocusCard} from "@/components/ui/focus-card";
import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import type {Project} from "@/features/work/projects";
import {FaGithub} from "react-icons/fa6";
import FisheyeShader, {type FisheyeSettings} from "@/components/fisheye-shader";

interface ContentBlock {
    type: "text" | "image";
    value: string;
}

function stableKeyForContent(block: ContentBlock, idx: number) {
    // Use a short hash of the value for a stable key when possible
    try {
        let h = 0
        for (let i = 0; i < block.value.length; i++) {
            h = (h << 5) - h + block.value.charCodeAt(i)
            h |= 0
        }
        return `${block.type}-${Math.abs(h)}`
    } catch {
        return `${block.type}-${idx}`
    }
}

const settings: FisheyeSettings = {
    fisheyeStrength: 1.0,
    vignetteStart: 0.3,
    vignetteEnd: 0.8,
    fisheyeRadius: 0.7,
    chromaticAberration: 0.005,
    noiseIntensity: 0.05,
    vignetteIntensity: 0.32,
    animationDuration: 0.64,
    canvasOpacity: 1.0,
    showVignetteMask: false,
};

export default function ProjectPage({project}: { project: Project }) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (<main className="min-h-screen bg-background text-foreground">
        {/* Hero Section with Cover Image */}
        <section className="relative h-96 w-full overflow-hidden bg-card md:h-screen md:max-h-[600px]">
            <FisheyeShader src={project.coverImage} settings={settings}/>
        </section>

        {/* Project Header */}
        <section className="border-border border-b px-6 py-12 md:px-12 md:py-20 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-start justify-between gap-8">
                    <div className="flex-1">
                         <p className="mb-4 font-mono text-muted-foreground text-sm">{project.year}</p>
                        <h1 className="mb-4 text-balance font-bold text-4xl md:text-5xl lg:text-6xl">{project.title}</h1>
                        <p className="text-balance text-lg text-muted-foreground md:text-xl">{project.subtitle}</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mb-12 flex flex-wrap gap-4">
                    {project.quickLinks.website && (<Link
                        href={project.quickLinks.website}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <ExternalLink size={18}/>
                        Visit Website
                    </Link>)}
                    {project.quickLinks.sourceCode && (<Link
                        href={project.quickLinks.sourceCode}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 transition-colors hover:bg-card"
                    >
                        <FaGithub size={18}/>
                        Source Code
                    </Link>)}
                    {project.quickLinks.demoVideo && (<Link
                        href={project.quickLinks.demoVideo}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 transition-colors hover:bg-card"
                    >
                        <Play size={18}/>
                        Watch Demo
                    </Link>)}
                </div>
            </div>
        </section>

        {/* Technologies */}
        <section className="border-border border-b px-6 py-12 md:px-12 md:py-20 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-8 font-bold text-2xl md:text-3xl">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, idx) => (
                        <Badge key={idx} className="px-3 py-1 text-sm">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </div>
        </section>

        {/* Project Content */}
        <section className="border-border border-b px-6 py-12 md:px-12 md:py-20 lg:px-16">
            <div className="mx-auto max-w-4xl space-y-12">
                {project.content.map((block, idx) => {
                    const key = stableKeyForContent(block, idx)
                    if (block.type === "text") {
                        return (<div key={key} className="prose prose-invert max-w-none">
                            <p className="whitespace-pre-wrap text-lg text-muted-foreground leading-relaxed">{block.value}</p>
                        </div>)
                    }

                    return (<div
                        key={key}
                        className="relative h-96 w-full overflow-hidden rounded-xl border border-border bg-card md:h-[500px]"
                    >
                        <Image
                            src={block.value || "/placeholder.svg"}
                            alt={`Project screenshot ${idx}`}
                            fill
                            className="object-cover"
                        />
                    </div>)
                })}
            </div>
        </section>

        {/* Related Projects */}
        {project.relatedProjects.length > 0 && (<section className="container mx-auto px-6 py-12 md:px-12 md:py-20 lg:px-16">
            <h2 className="mb-8 font-bold text-2xl md:text-3xl">Related Projects</h2>
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:px-8">
                {project.relatedProjects.map((rp, idx) => (
                    <Link key={rp.slug} href={`/work/${rp.slug}`}>
                        <FocusCard card={{src: rp.coverImage || '/img.png', title: rp.title}} index={idx} hovered={hovered}
                                   setHovered={setHovered}/>
                    </Link>
                ))}
            </div>
        </section>)}
    </main>)
}
