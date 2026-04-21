import type { Metadata } from "next";
import Image from "next/image";
import { SkillCard } from "@/components/SkillCard";

export const metadata: Metadata = {
  title: "About",
};

interface Skill {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

const developmentSkills: Skill[] = [
  { title: "Angular", description: "Frontend Framework", icon: "/icons/angular.svg", delay: 200 },
  { title: "React", description: "Frontend Framework", icon: "/icons/react.svg", delay: 300 },
  { title: "Vue", description: "Frontend Framework", icon: "/icons/vue.svg", delay: 400 },
  { title: "TypeScript", description: "Programming Language", icon: "/icons/typescript.svg", delay: 500 },
  { title: "Java", description: "Programming Language", icon: "/icons/java.svg", delay: 600 },
  { title: "Spring", description: "Backend Framework", icon: "/icons/spring.svg", delay: 700 },
  { title: "Nest.js", description: "Backend Framework", icon: "/icons/nest.svg", delay: 800 },
  { title: "Node.js", description: "Backend Runtime", icon: "/icons/node.svg", delay: 200 },
  { title: "Firebase", description: "Backend Platform", icon: "/icons/firebase.svg", delay: 300 },
];

const cliftonStrengths = ["Activator", "Restorative", "Command", "Woo", "Ideation"];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg md:sticky md:top-24 md:self-start opacity-0 animate-fade-in overflow-hidden md:h-[70vh] max-md:h-[400px] max-sm:h-[300px] relative">
          <Image
            src="/me2.webp"
            alt="Portrait of Paweł Ostromecki"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="shadow-xl object-cover rounded-lg"
          />
        </div>
        <div className="prose prose-primary dark:prose-invert opacity-0 animate-fade-in animation-delay-200 max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About Me</h1>
          <div className="mt-6 text-gray-600 dark:text-gray-300">
            <p>
              I&apos;m a senior frontend engineer who&apos;s spent years deep in Angular, TypeScript, and the
              broader JavaScript ecosystem — building complex, production-grade applications and
              caring way too much about clean architecture, performance, and developer experience.
              I&apos;m equally comfortable wiring up a Node.js or Spring backend, but the frontend is
              where I do my best thinking.
            </p>
            <p>
              Beyond shipping code, I lead the Angular Wrocław community — organizing meetups,
              giving talks, running hands-on workshops, and mentoring developers who are leveling
              up their skills. I don&apos;t just participate in the local Angular ecosystem; I actively
              shape it. Open source is another outlet for that energy, and you can find my
              contributions on GitHub at{" "}
              <a
                href="https://github.com/ostromeckyp"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @ostromeckyp
              </a>
              .
            </p>
            <p>
              Teaching and mentoring have become as important to me as engineering itself. There&apos;s
              something deeply rewarding about helping another developer have that &ldquo;aha&rdquo;
              moment — whether it&apos;s on stage at a meetup, in a workshop, or during a code review.
              It keeps me sharp and honest about what I actually know.
            </p>
            <p>
              Lately, I&apos;ve been increasingly drawn to the intersection of frontend engineering and
              AI-powered intelligent systems — and I&apos;m excited about where that convergence is
              heading next.
            </p>
            <div className="mt-8 mb-8">
              <a
                href="/cv.pdf"
                download="Pawel Ostromecki CV.pdf"
                className="no-underline inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Resume
              </a>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Hard Skills</h2>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
              Development
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {developmentSkills.map((skill) => (
                <SkillCard
                  key={skill.title}
                  title={skill.title}
                  delay={skill.delay}
                  icon={
                    <Image
                      src={skill.icon}
                      alt=""
                      width={30}
                      height={30}
                      className="dark:invert"
                    />
                  }
                />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12">
              Soft Skills (CliftonStrengths)
            </h2>
            <div className="flex flex-wrap gap-3 mt-6">
              {cliftonStrengths.map((s, i) => (
                <span
                  key={s}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-200 text-sm font-medium opacity-0 animate-fade-in"
                  style={{ animationDelay: `${150 + i * 100}ms` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
