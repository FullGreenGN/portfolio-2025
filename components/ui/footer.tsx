import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "GitHub", href: "https://github.com", icon: FaGithub },
        { name: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
        { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
        { name: "Email", href: "mailto:contact@example.com", icon: FaEnvelope },
    ];

    const utilityLinks = [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
    ];

    return (
        <footer className="container m-8 mx-auto flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Jean‑Luc O.</h3>
                        <p className="text-muted-foreground text-sm">
                            FullStack Developer, System Administrator, and DevOps Engineer
                            building modern web experiences.
                        </p>
                    </div>

                    {/* Utility Links */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Legal</h4>
                        <ul className="space-y-2">
                            {utilityLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        aria-label={social.name}
                                        className="text-muted-foreground transition-colors hover:text-foreground"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-border/40 border-t pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-muted-foreground text-sm">
                            © {currentYear} Jean‑Luc O. All rights reserved.
                        </p>
                        <p className="text-muted-foreground text-xs">
                            Built with Next.js, TypeScript & Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
