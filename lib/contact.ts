import {resend} from "@/lib/resend";
import {NextResponse} from "next/server";

type ContactPayload = {
    name: string;
    email: string;
    message: string;
};

export async function sendContact(payload: ContactPayload) {
    const {name, email, message} = payload;

    // uses resend to send email to the CONTACT_EMAIL in env
    const emailTo = process.env.CONTACT_EMAIL;

    // write send email to the email var with resend
    if (!email) {
        throw new Error('CONTACT_EMAIL is not defined');
    }

    const res = await resend.emails.send({
        from: 'Contact Form <no-reply@polarisdev.fr>',
        to: emailTo!,
        subject: `New message from ${name}`,
        text: `You have a new message from your website contact form.
            Name: ${name}
            Email: ${email}
            
            Message:
            ${message}
        `,
    });

    return NextResponse.json({id: res.data?.id, message: 'Message Sent', status: 200})
}
