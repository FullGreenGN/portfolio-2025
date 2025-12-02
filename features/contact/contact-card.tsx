import { MotionDiv } from "@/components/motion-div";
import type React from 'react';
import { cn } from '@/lib/utils';
import type {
    LucideIcon,
} from 'lucide-react';
import type {IconType} from "react-icons";

type ContactInfoProps = React.ComponentProps<'div'> & {
    icon: LucideIcon | IconType;
    label: string;
    value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
    // Content props
    title?: string;
    description?: string;
    contactInfo?: ContactInfoProps[];
    formSectionClassName?: string;
};

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export function ContactCard({
                                title = 'Contact With Us',
                                description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
                                contactInfo,
                                className,
                                formSectionClassName,
                                children,
                            }: ContactCardProps) {
    return (
        <MotionDiv
            className={cn(
                'relative grid h-full w-full md:grid-cols-2 lg:grid-cols-3',
                className,
            )}
            initial="hidden"
            animate="visible"
            transition={{
                delay: 0.5,
                ease: "easeInOut",
                duration: 0.5,
            }}
            variants={variants}
        >
            <div className="flex flex-col justify-between lg:col-span-2">
                <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
                    <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                        {title}
                    </h1>
                    <p className="text-muted-foreground max-w-xl text-sm">
                        {description}
                    </p>
                    <div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                        {contactInfo?.map((info, index) => (
                            <ContactInfo key={index} {...info} />
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    'flex h-full w-full items-center',
                    formSectionClassName,
                )}
            >
                {children}
            </div>
        </MotionDiv>
    );
}

function ContactInfo({
                         icon: Icon,
                         label,
                         value,
                         className,
                         ...props
                     }: ContactInfoProps) {
    return (
        <div className={cn('flex items-center gap-3 py-3', className)} {...props}>
            <div className="bg-muted/40 rounded-lg p-3">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-muted-foreground text-xs">{value}</p>
            </div>
        </div>
    );
}
