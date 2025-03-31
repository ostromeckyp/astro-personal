import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const resend = new Resend("re_eZqoyEmA_DhVMyxYmvAvXD4QJ5YRHtGRX");
const prerender = false;
const POST = async ({ request }) => {
  const { data } = Object.fromEntries(new URL(request.url).searchParams);
  const { name, email, message } = JSON.parse(data);
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.toString())) {
    return new Response(JSON.stringify({ message: "Invalid email address" }), { status: 400, statusText: "Invalid email address" });
  }
  const mailData = await resend.emails.send({
    from: "delivered@ostromecki.dev",
    to: ["contact@ostromecki.dev"],
    subject: "Contact",
    html: `
      <h2>From: ${name} ${email}</h2>
      <br/>
      <p>${message}</p>
      `
  });
  return new Response(
    JSON.stringify({
      message: "Your message has been sent!",
      mailData
    }),
    { status: 200 }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
