import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white opacity-0 animate-fade-in animation-delay-100">
          Get in touch
        </h1>
        <div
          className="w-24 h-1 bg-primary mx-auto mt-4 opacity-0 animate-fade-in animation-delay-200"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="opacity-0 animate-fade-in animation-delay-200">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Message Me</h2>
          <ContactForm />
        </div>

        <div className="opacity-0 animate-fade-in animation-delay-200">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Info</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Always available for freelance work if the right project comes along. Feel free to
            contact me!
          </p>

          <ul className="space-y-6">
            <li className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Name</div>
                <div className="text-gray-900 dark:text-gray-200">Pawel Ostromecki</div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                <div className="text-gray-900 dark:text-gray-200">Wroclaw, Poland</div>
              </div>
            </li>

            <li className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Call me</div>
                <a
                  href="tel:+48661546446"
                  className="text-gray-900 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  +48 661 546 446
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
