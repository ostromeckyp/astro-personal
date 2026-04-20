import type { APIRoute } from "astro";
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ message: 'Server configuration error: missing API key' }), { status: 500 });
  }

  const resend = new Resend(apiKey);

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
