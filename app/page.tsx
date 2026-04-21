import Image from "next/image";
import Link from "next/link";
import { SocialsFloat } from "@/components/SocialsFloat";

export default function HomePage() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center">
        <div className="mb-8 opacity-0 animate-fade-in">
          <Image
            src="/me.webp"
            alt="Portrait of Paweł Ostromecki"
            width={256}
            height={256}
            priority
            className="w-64 h-64 rounded-full mx-auto shadow-lg object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl opacity-0 animate-fade-in animation-delay-200">
          Hi I&apos;m Paweł Ostromecki
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl opacity-0 animate-fade-in animation-delay-400">
          Senior Software Engineer with deep expertise in TypeScript and full-stack architecture.
          Community Lead at Angular Wrocław, active open source contributor, and passionate about
          the intersection of software engineering and AI-powered systems.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 opacity-0 animate-fade-in animation-delay-400">
          <div className="rounded-md shadow">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      <SocialsFloat />
    </div>
  );
}
