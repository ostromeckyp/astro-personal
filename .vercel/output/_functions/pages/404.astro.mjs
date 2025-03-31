/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_NCr81CSJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Dpo2qV3t.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - Page Not Found" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[80vh] flex items-center justify-center px-4"> <div class="text-center opacity-0 animate-fade-in"> <h1 class="text-9xl font-bold text-primary mb-4">404</h1> <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Page Not Found</h2> <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
</p> <a href="/" class="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 transition-all duration-300 hover:scale-105"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg>
Back to Home
</a> </div> </div> ` })}`;
}, "/Users/pablo/Downloads/project/src/pages/404.astro", void 0);

const $$file = "/Users/pablo/Downloads/project/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
