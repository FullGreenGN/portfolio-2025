import ProjectPage from "@/features/work/project-page";
import { notFound } from "next/navigation";
import projects from "@/features/work/projects";
import type { Project } from "@/features/work/projects";

import { MotionScroll } from "@/components/motion-scroll";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const list = Array.isArray(projects) ? projects : [projects as Project];
    const project = list.find((p) => p.slug === slug);

    if (!project) return notFound();

    return (
        <MotionScroll>
            <ProjectPage project={project} />
        </MotionScroll>
    );
}

