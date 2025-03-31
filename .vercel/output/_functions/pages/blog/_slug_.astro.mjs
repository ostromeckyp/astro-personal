/* empty css                                    */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_NCr81CSJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_Dpo2qV3t.mjs';
import { g as getEntry, r as renderEntry } from '../../chunks/_astro_content_B7kASG87.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/404");
  }
  const post = await getEntry("blog", slug.toString());
  if (!post) {
    return Astro2.redirect("/404");
  }
  const { Content } = await renderEntry(post);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.data.title} | Portfolio` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="prose prose-primary max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div class="mb-8"> <a href="/blog" class="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-300 mb-6 group"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Back to Blog
</a> <img${addAttribute(post.data.image, "src")}${addAttribute(post.data.title, "alt")} class="w-full h-[400px] object-cover rounded-xl shadow-lg"> </div> <div class="mx-auto"> <div class="mb-8"> <h1 class="text-4xl font-bold text-gray-900 mb-4">${post.data.title}</h1> <div class="flex items-center text-gray-500"> <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"> ${post.data.category} </span> <span class="mx-2">•</span> <time${addAttribute(post.data.date, "datetime")}> ${new Date(post.data.date).toLocaleDateString()} </time> </div> </div> <div> ${renderComponent($$result2, "Content", Content, {})} </div> </div> </article> ` })}`;
}, "/Users/pablo/Downloads/project/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/pablo/Downloads/project/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
