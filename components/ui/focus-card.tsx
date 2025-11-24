"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { EncryptedText } from "@/components/ui/encrypted-text";

// Presentational FocusCard: receives whether it should be blurred and if it's the active (hovered) card
export const FocusCard = React.memo(
    ({
         card,
         index,
         hovered,
         setHovered,
     }: {
        card: any;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    }) => (
        // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
<div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "relative h-60 w-full overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out md:h-96 dark:bg-neutral-900",
                hovered !== null && hovered !== index && "scale-[0.98] blur-sm"
            )}
        >
            <Image
                src={card.src}
                alt={card.title}
                fill
                className="absolute inset-0 object-cover"
            />
            <div
                className={cn(
                    "absolute inset-0 flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300",
                    hovered === index ? "opacity-100" : "opacity-0"
                )}
            >
                <div className="bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text font-medium text-transparent text-xl md:text-2xl">
                    {hovered === index && <EncryptedText text={card.title} />}
                </div>
            </div>
        </div>
    )
);

FocusCard.displayName = "Card";