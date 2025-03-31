/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_NCr81CSJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Dpo2qV3t.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home | Portfolio" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div class="text-center"> <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl opacity-0 animate-fade-in">
Welcome to My Portfolio
</h1> <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl opacity-0 animate-fade-in [animation-delay:200ms]">
Full-stack developer passionate about creating beautiful and functional web applications.
</p> <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 opacity-0 animate-fade-in [animation-delay:400ms]"> <div class="rounded-md shadow"> <a href="/contact" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105">
Get in touch
</a> </div> </div> </div> </div> ` })}`;
}, "/Users/pablo/Downloads/project/src/pages/index.astro", void 0);

const $$file = "/Users/pablo/Downloads/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
