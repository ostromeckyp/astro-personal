/* empty css                                 */
import { c as createComponent, b as createAstro, m as maybeRenderHead, a as renderTemplate, r as renderComponent, d as addAttribute } from '../chunks/astro/server_NCr81CSJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Dpo2qV3t.mjs';
import 'clsx';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$TimelineCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TimelineCard;
  const { title, subtitle, year, description, skills, index } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative pl-12 pb-12 last:pb-0"> <div class="absolute left-0 top-2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"> <div class="w-3 h-3 rounded-full bg-primary"></div> </div> <div class="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md"> <span class="text-sm text-gray-500 dark:text-gray-400">${year}</span> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-1">${title}</h3> <p class="text-gray-600 dark:text-gray-300">${subtitle}</p> ${description && renderTemplate`<p class="mt-4 text-gray-600 dark:text-gray-300">${description}</p>`} ${skills && renderTemplate`<div class="mt-4 flex flex-wrap gap-2"> ${skills.map((skill) => renderTemplate`<span class="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"> ${skill} </span>`)} </div>`} </div> </div>`;
}, "/Users/pablo/Downloads/project/src/components/TimelineCard.astro", void 0);

const $$Resume = createComponent(($$result, $$props, $$slots) => {
  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      description: "Leading development of enterprise-level applications using Angular and Node.js. Mentoring junior developers and implementing best practices.",
      skills: ["Angular", "Node.js", "TypeScript", "MongoDB", "AWS"]
    },
    {
      year: "2021 - 2023",
      title: "Full Stack Developer",
      company: "Digital Innovations",
      description: "Developed and maintained multiple web applications using React and Express. Improved application performance by 40%.",
      skills: ["React", "Express", "PostgreSQL", "Docker"]
    },
    {
      year: "2019 - 2021",
      title: "Frontend Developer",
      company: "Web Solutions",
      description: "Built responsive and user-friendly interfaces using Vue.js and modern CSS techniques.",
      skills: ["Vue.js", "Sass", "REST APIs"]
    }
  ];
  const education = [
    {
      year: "2015 - 2019",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology"
    },
    {
      year: "2012 - 2015",
      degree: "High School Diploma",
      institution: "Tech High School"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Resume | Portfolio", "data-astro-cid-ruvg6z4q": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-astro-cid-ruvg6z4q> <div class="max-w-3xl mx-auto opacity-0 animate-fade-in" data-astro-cid-ruvg6z4q> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8" data-astro-cid-ruvg6z4q>Resume</h1> <div class="relative" data-astro-cid-ruvg6z4q> <div class="absolute left-4 top-0 h-full w-0.5 bg-primary/20" data-astro-cid-ruvg6z4q></div> ${experiences.map((exp, index) => renderTemplate`<div class="mb-4 last:mb-0 opacity-0 animate-fade-in"${addAttribute(`animation-delay: ${(index + 1) * 100}ms`, "style")} data-astro-cid-ruvg6z4q> ${renderComponent($$result2, "TimelineCard", $$TimelineCard, { "title": exp.title, "subtitle": exp.company, "year": exp.year, "description": exp.description, "skills": exp.skills, "index": index, "data-astro-cid-ruvg6z4q": true })} </div>`)} </div> <div class="mt-12 opacity-0 animate-fade-in" style="animation-delay: 500ms" data-astro-cid-ruvg6z4q> <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6" data-astro-cid-ruvg6z4q>Education</h2> <div class="relative" data-astro-cid-ruvg6z4q> <div class="absolute left-4 top-0 h-full w-0.5 bg-primary/20" data-astro-cid-ruvg6z4q></div> ${education.map((edu, index) => renderTemplate`<div class="mb-4 last:mb-0 opacity-0 animate-fade-in"${addAttribute(`animation-delay: ${600 + index * 100}ms`, "style")} data-astro-cid-ruvg6z4q> ${renderComponent($$result2, "TimelineCard", $$TimelineCard, { "title": edu.degree, "subtitle": edu.institution, "year": edu.year, "index": index, "data-astro-cid-ruvg6z4q": true })} </div>`)} </div> </div>  <div class="mt-16 opacity-0 animate-fade-in" style="animation-delay: 800ms" data-astro-cid-ruvg6z4q> <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6" data-astro-cid-ruvg6z4q>Featured Video</h2> <div class="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-lg" data-astro-cid-ruvg6z4q> <iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/DPeF4v2CNmU?si=YjfNL4Kn--ODNEVW" title="YouTube video player" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen data-astro-cid-ruvg6z4q></iframe> </div> </div> </div> </div> ` })} `;
}, "/Users/pablo/Downloads/project/src/pages/resume.astro", void 0);

const $$file = "/Users/pablo/Downloads/project/src/pages/resume.astro";
const $$url = "/resume";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resume,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
