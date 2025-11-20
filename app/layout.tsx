import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { siteConfig } from "@/lib/site-config";
import {Footer} from "@/components/ui/footer";
import {Providers} from "@/components/providers";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${jetbrainsMono.variable} antialiased`}>
				<Providers>
                    <ScrollProgress />
                    <Navbar />
                    {children}
                    <Footer/>
                </Providers>
			</body>
		</html>
	);
}
