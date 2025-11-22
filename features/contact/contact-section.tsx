"use client";

import { ContactCard } from "./contact-card";
import { MailIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {FaDiscord} from "react-icons/fa";
import { useState } from 'react';

export default function ContactSection() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validate = () => {
        if (name.trim().length < 2) return 'Please provide your name (min 2 characters).';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please provide a valid email address.';
        if (message.trim().length < 10) return 'Message must be at least 10 characters.';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage(null);
        setErrorMessage(null);

        const clientError = validate();
        if (clientError) {
            setErrorMessage(clientError);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
            });

            if (res.ok) {
                setStatusMessage('Thanks — your message was sent. I will get back to you soon.');
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else if (res.status === 400) {
                const data = await res.json();
                setErrorMessage(data?.error || 'Validation error, please check your input.');
            } else if (res.status === 429) {
                setErrorMessage('Too many requests. Please wait a moment and try again.');
            } else {
                setErrorMessage('Something went wrong. Please try again later.');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Network error. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container m-8 mx-auto flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto w-full">
                <ContactCard
                    title="Get in touch"
                    description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
                    contactInfo={[
                        {
                            icon: MailIcon,
                            label: 'Email',
                            value: 'j.luc@polarisdev.fr',
                        },
                        {
                            icon: FaDiscord,
                            label: 'Discord',
                            value: 'fullgreen.gn',
                        }
                    ]}
                >
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        {statusMessage && (
                            <div className="rounded-md bg-green-600/20 px-4 py-2 text-green-400">{statusMessage}</div>
                        )}
                        {errorMessage && (
                            <div className="rounded-md bg-red-600/10 px-4 py-2 text-red-400">{errorMessage}</div>
                        )}

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="contact-name">Name</Label>
                            <Input id="contact-name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="contact-email">Email</Label>
                            <Input id="contact-email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="contact-phone">Phone</Label>
                            <Input id="contact-phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="contact-message">Message</Label>
                            <Textarea id="contact-message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                        </div>
                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending…' : 'Submit'}
                        </Button>
                    </form>
                </ContactCard>
            </div>
        </main>
    );
}