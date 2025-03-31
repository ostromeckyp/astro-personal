/* empty css                                 */
import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_NCr81CSJ.mjs';
import 'kleur/colors';
import { a as getCollection } from '../chunks/_astro_content_B7kASG87.mjs';
import { $ as $$Layout } from '../chunks/Layout_Dpo2qV3t.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { title, image, category, date, slug, index } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"> <a${addAttribute(`/blog/${slug}`, "href")} class="group"> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"> <div class="p-6"> <h2 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">${title}</h2> <div class="flex items-center text-gray-500 text-sm"> <span class="bg-primary/10 text-primary px-3 py-1 rounded-full"> ${category} </span> <span class="mx-2">•</span> <time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString()} </time> </div> </div> </a> </article>`;
}, "/Users/pablo/Downloads/project/src/components/BlogCard.astro", void 0);

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog | Portfolio" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <h1 class="text-4xl font-bold text-gray-900 mb-8">Blog</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${sortedPosts.map((post, index) => renderTemplate`<div class="opacity-0 animate-fade-in"${addAttribute(`animation-delay: ${(index + 1) * 100}ms`, "style")}> ${renderComponent($$result2, "BlogCard", $$BlogCard, { "title": post.data.title, "image": post.data.image, "category": post.data.category, "date": new Date(post.data.date), "slug": post.data.slug, "index": index })} </div>`)} </div> </div> ` })}`;
}, "/Users/pablo/Downloads/project/src/pages/blog.astro", void 0);

const $$file = "/Users/pablo/Downloads/project/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
