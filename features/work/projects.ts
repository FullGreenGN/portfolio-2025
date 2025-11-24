interface Project {
    id: string;
    title: string;
    subtitle: string;
    year: string;
    slug: string;
    smallCoverImage: string;
    coverImage: string;
    quickLinks: {
        website: string | null;
        sourceCode: string | null;
        demoVideo: string | null;
    };
    technologies: string[];
    content: {
        type: "text" | "image";
        value: string;
    }[];
    relatedProjects: {
        slug: string;
        title: string;
        coverImage?: string;
    }[];
}

const projects: Project[] = [
    {
        id: "technosphere",
        title: "TechnoSphere",
        subtitle: "A booking and managing platform for DJs and Agencies",
        year: "2025",
        slug: "technosphere",
        smallCoverImage: "/work/technosphere/cover-small.png",
        coverImage: "/work/technosphere/cover.png",
        quickLinks: {
            website: "https://technosphere.app",
            sourceCode: "https://github.com/technosphere-app",
            demoVideo: null,
        },
        technologies: [
            "Next.js",
            "Framer Motion",
            "Tailwind CSS",
            "Prisma",
            "Stripe",
        ],
        content: [
            {
                type: "text",
                value:
                    "TechnoSphere is a comprehensive web application designed to streamline the process of booking and managing DJs and agencies for events. The platform offers an intuitive interface for event organizers to discover talent, manage bookings, and handle payments all in one place.",
            },
            {
                type: "image",
                value: "/work/technosphere/screenshot-1.png",
            },
            {
                type: "text",
                value:
                    "Key Features:\n• Talent Discovery: Browse through a curated list of DJs and agencies with detailed profiles, reviews, and ratings.\n• Booking Management: Easily book talent for events, manage schedules, and track bookings in real-time.\n• Payment Integration: Secure payment processing with multiple payment options for hassle-free transactions.\n• User Dashboard: Personalized dashboards for both event organizers and talent to manage their activities efficiently.\n• Notifications: Automated email and SMS notifications for booking confirmations, reminders, and updates.",
            },
            {
                type: "image",
                value: "/work/technosphere/screenshot-2.png",
            },
            {
                type: "text",
                value:
                    "Tech Stack:\nThe application is built using Next.js 15 for server-side rendering and React 19 for a dynamic user interface. TypeScript ensures type safety across the codebase, while Tailwind CSS provides a utility-first approach to styling. Supabase serves as the backend, offering a scalable database and authentication services. The platform is deployed on Vercel for optimal performance and scalability. Framer Motion is utilized for smooth animations, and React Hook Form simplifies form management throughout the application.",
            },
        ],
        relatedProjects: [

        ],
    }
];

export type { Project };
export default projects;