import type { APIRoute } from "astro";
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { data } = Object.fromEntries(new URL(request.url).searchParams);

  const { name, email, message } = JSON.parse(data);

    if(!name || !email || !message) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }) , { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.toString())) {
      
        return new Response(JSON.stringify({ message: 'Invalid email address' }), { status: 400, statusText: 'Invalid email address' });
    }

    const mailData = await resend.emails.send({
      from: 'delivered@ostromecki.dev',
      to: ['contact@ostromecki.dev'],
      subject: 'Contact',
      html: `
      <h2>From: ${name} ${email}</h2>
      <br/>
      <p>${message}</p>
      `
    })
    

    return new Response(
        JSON.stringify({
          message: "Your message has been sent!",
          mailData
        }),
        { status: 200 }
      );
}