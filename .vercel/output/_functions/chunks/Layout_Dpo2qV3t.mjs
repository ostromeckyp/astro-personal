import { c as createComponent, b as createAstro, d as addAttribute, e as renderScript, a as renderTemplate, f as renderSlot, g as renderHead, r as renderComponent } from './astro/server_NCr81CSJ.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/pablo/Downloads/project/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/pablo/Downloads/project/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const pathname = new URL(Astro2.request.url).pathname;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap" rel="stylesheet"><meta name="generator"', "><title>", "</title>", "", '</head> <body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"> <nav class="bg-white dark:bg-gray-800 shadow-sm flex-shrink-0"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between h-16"> <div class="flex"> <a href="/" class="flex items-center text-xl font-bold text-gray-800 hover:text-primary">Portfolio</a> </div>  <div class="hidden md:flex space-x-8"> <a href="/"', '>Home</a> <a href="/about"', '>About</a> <a href="/blog"', '>Blog</a> <a href="/resume"', '>Resume</a> <a href="/contact"', '>Contact</a> </div>  <div class="md:hidden flex items-center"> <button id="burger-menu" class="p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"> <div class="w-6 h-6 flex flex-col justify-between"> <span class="burger-line w-full h-0.5 bg-current"></span> <span class="burger-line w-full h-0.5 bg-current"></span> <span class="burger-line w-full h-0.5 bg-current"></span> </div> </button> </div> </div> </div>  <div id="mobile-menu" class="mobile-menu"> <div class="flex flex-col h-full"> <div class="flex justify-between items-center p-4 border-b"> <a href="/" class="text-xl font-bold text-gray-800">Portfolio</a> <button id="close-menu" class="p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <div class="flex flex-col p-4 space-y-4"> <a href="/"', '>Home</a> <a href="/about"', '>About</a> <a href="/blog"', '>Blog</a> <a href="/resume"', '>Resume</a> <a href="/contact"', '>Contact</a> </div> </div> </div> </nav> <main class="flex-grow overflow-auto"> <div class="min-h-full"> ', ` </div> </main> <footer class="bg-white dark:bg-gray-800 mt-auto flex-shrink-0"> <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"> <p class="text-center text-gray-500">\xA9 2024 Portfolio. All rights reserved.</p> </div> </footer> <script>
      document.addEventListener('astro:page-load', function() {
        // Mobile Menu
        const burgerMenu = document.getElementById('burger-menu');
        const closeMenu = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const body = document.body;

        function toggleMenu() {
          mobileMenu.classList.toggle('open');
          burgerMenu.classList.toggle('burger-open');
          body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        }

        burgerMenu.addEventListener('click', toggleMenu);
        closeMenu.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
          link.addEventListener('click', () => {
            // Remove transitions before closing
            mobileMenu.style.transition = 'none';
            document.querySelectorAll('.burger-line').forEach(line => {
              line.style.transition = 'none';
            });
            
            // Close menu and reset burger
            mobileMenu.classList.remove('open');
            burgerMenu.classList.remove('burger-open');
            body.style.overflow = '';
            
            // Re-add transitions after a frame
            requestAnimationFrame(() => {
              mobileMenu.style.transition = '';
              document.querySelectorAll('.burger-line').forEach(line => {
                line.style.transition = '';
              });
            });
          });
        });
      });
    <\/script> </body> </html> `])), addAttribute(Astro2.generator, "content"), title, renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderHead(), addAttribute(`nav-link ${pathname === "/" ? "active" : ""}`, "class"), addAttribute(`nav-link ${pathname === "/about" ? "active" : ""}`, "class"), addAttribute(`nav-link ${pathname === "/blog" ? "active" : ""}`, "class"), addAttribute(`nav-link ${pathname === "/resume" ? "active" : ""}`, "class"), addAttribute(`nav-link ${pathname === "/contact" ? "active" : ""}`, "class"), addAttribute(`text-lg text-gray-600 hover:text-primary ${pathname === "/" ? "text-primary" : ""}`, "class"), addAttribute(`text-lg text-gray-600 hover:text-primary ${pathname === "/about" ? "text-primary" : ""}`, "class"), addAttribute(`text-lg text-gray-600 hover:text-primary ${pathname === "/blog" ? "text-primary" : ""}`, "class"), addAttribute(`text-lg text-gray-600 hover:text-primary ${pathname === "/resume" ? "text-primary" : ""}`, "class"), addAttribute(`text-lg text-gray-600 hover:text-primary ${pathname === "/contact" ? "text-primary" : ""}`, "class"), renderSlot($$result, $$slots["default"]));
}, "/Users/pablo/Downloads/project/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
