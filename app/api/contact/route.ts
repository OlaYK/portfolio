import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Only initialize if API key is present to avoid build errors
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
        }

        if (!resend) {
            // Fallback/Mock if no API key is set yet
            console.log('RESEND_API_KEY not found. Simulating email:', { name, email, message });
            return NextResponse.json({
                success: true,
                message: 'Message captured (Development Mode: No API Key set).'
            });
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Resend default for free tire
            to: ['oolayinkadaniel@gmail.com'],
            subject: `New Message from ${name}`,
            replyTo: email,
            html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
