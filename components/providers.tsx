import PlausibleProvider from "next-plausible";
import {ThemeProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
    return (<PlausibleProvider domain="fullgreen.software" selfHosted={true}
                               customDomain={"https://analytics.polarisdev.fr"}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </PlausibleProvider>)
}