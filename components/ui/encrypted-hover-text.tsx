import {useEffect, useRef, useState} from "react";

const HOVER_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateHoverRandom(charset: string) {
    const idx = Math.floor(Math.random() * charset.length);
    return charset.charAt(idx);
}

export function HoverEncryptedLink({text, href, className}: {text: string; href: string; className?: string}) {
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