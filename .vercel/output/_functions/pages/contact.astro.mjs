/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_NCr81CSJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Dpo2qV3t.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

function Contact() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());
    setError("");
    setMessage("");
    setIsLoading(true);
    await fetch(`/api/contact?data=${encodeURIComponent(JSON.stringify(formEntries))}`, {
      method: "POST",
      body: JSON.stringify(formEntries)
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        return;
      }
      setIsLoading(false);
      setError(data.message);
    }).catch((error2) => {
      setError(error2.message);
      setIsLoading(false);
    });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 dark:text-dark-text", children: "Name" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "name",
          name: "name",
          autoComplete: "name",
          required: true,
          className: "mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-dark-text", children: "Email" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          id: "email",
          name: "email",
          autoComplete: "email",
          required: true,
          className: "mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700 dark:text-dark-text", children: "Message" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "message",
          name: "message",
          autoComplete: "off",
          required: true,
          rows: 4,
          className: "mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        disabled: isLoading,
        type: "submit",
        className: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primaryShadowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:bg-gray-400",
        children: "Send Message"
      }
    ) }),
    message && /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-green-600 dark:text-green-400", children: [
      /* @__PURE__ */ jsx("span", { className: "block", children: message }),
      /* @__PURE__ */ jsx("span", { className: "block", children: "Thank you for a contact" })
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-red-600 dark:text-red-400", children: error })
  ] });
}

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact | Portfolio", "data-astro-cid-uw5kdbxl": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-astro-cid-uw5kdbxl> <div class="text-center mb-16" data-astro-cid-uw5kdbxl> <p class="text-gray-600 dark:text-gray-400 mb-2 opacity-0 animate-fade-in" data-astro-cid-uw5kdbxl>Feel free to contact me anytime</p> <h1 class="text-5xl font-bold text-gray-900 dark:text-white opacity-0 animate-fade-in animation-delay-100" data-astro-cid-uw5kdbxl>Get in touch</h1> <div class="w-24 h-1 bg-emerald-500 mx-auto mt-4 opacity-0 animate-fade-in animation-delay-200" data-astro-cid-uw5kdbxl></div> </div> <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12" data-astro-cid-uw5kdbxl> <div class="opacity-0 animate-fade-in animation-delay-200" data-astro-cid-uw5kdbxl> <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-astro-cid-uw5kdbxl>Message Me</h2> ${renderComponent($$result2, "Contact", Contact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/pablo/Downloads/project/src/components/Contact", "client:component-export": "default", "data-astro-cid-uw5kdbxl": true })} </div> <div class="opacity-0 animate-fade-in animation-delay-200" data-astro-cid-uw5kdbxl> <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-astro-cid-uw5kdbxl>Contact Info</h2> <p class="text-gray-600 dark:text-gray-400 mb-8" data-astro-cid-uw5kdbxl>Always available for freelance work if the right project comes along. Feel free to contact me!</p> <div class="space-y-6" data-astro-cid-uw5kdbxl> <div class="flex items-center" data-astro-cid-uw5kdbxl> <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-4" data-astro-cid-uw5kdbxl> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-uw5kdbxl> <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" data-astro-cid-uw5kdbxl></path> </svg> </div> <div data-astro-cid-uw5kdbxl> <div class="text-sm text-gray-600 dark:text-gray-400" data-astro-cid-uw5kdbxl>Name</div> <div class="text-gray-900 dark:text-gray-200" data-astro-cid-uw5kdbxl>Pawel Ostromecki</div> </div> </div> <div class="flex items-center" data-astro-cid-uw5kdbxl> <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-4" data-astro-cid-uw5kdbxl> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-uw5kdbxl> <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" data-astro-cid-uw5kdbxl></path> </svg> </div> <div data-astro-cid-uw5kdbxl> <div class="text-sm text-gray-600 dark:text-gray-400" data-astro-cid-uw5kdbxl>Location</div> <div class="text-gray-900 dark:text-gray-200" data-astro-cid-uw5kdbxl>Wroclaw, Poland</div> </div> </div> <div class="flex items-center" data-astro-cid-uw5kdbxl> <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-4" data-astro-cid-uw5kdbxl> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-uw5kdbxl> <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" data-astro-cid-uw5kdbxl></path> </svg> </div> <div data-astro-cid-uw5kdbxl> <div class="text-sm text-gray-600 dark:text-gray-400" data-astro-cid-uw5kdbxl>Call me</div> <a href="tel:+48661546446" class="text-gray-900 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors" data-astro-cid-uw5kdbxl>
+48 661 546 446
</a> </div> </div> </div> </div> </div> </div> ` })} `;
}, "/Users/pablo/Downloads/project/src/pages/contact.astro", void 0);

const $$file = "/Users/pablo/Downloads/project/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Contact,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
