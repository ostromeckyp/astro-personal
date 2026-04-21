"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ContactInput, contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";
import { useContactMutation } from '@/app/hooks/use-contact-mutation';

export function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        defaultValues: {name: "", email: "", message: "", website: ""},
    });

    const mutation = useContactMutation(reset)

    const onSubmit = handleSubmit((values) => {
        if (values.website) return; // honeypot tripped
        mutation.mutate(values);
    });

    const inputClass =
        "mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-primary focus:ring-primary sm:text-sm";

    return (
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text"
                >
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.name || undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass}
                    {...register("name")}
                />
                {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email || undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                    {...register("email")}
                />
                {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-dark-text"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    rows={4}
                    autoComplete="off"
                    aria-invalid={!!errors.message || undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={inputClass}
                    {...register("message")}
                />
                {errors.message && (
                    <p
                        id="message-error"
                        role="alert"
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                        {errors.message.message}
                    </p>
                )}
            </div>

            {/* Honeypot — hidden from real users */}
            <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                />
            </div>

            <div>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    aria-busy={mutation.isPending}
                    className={cn(
                        "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-shadowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200",
                        mutation.isPending && "opacity-50 cursor-not-allowed",
                    )}
                >
                    {mutation.isPending ? "Sending…" : "Send Message"}
                </button>
            </div>

            {mutation.isSuccess && (
                <p
                    role="status"
                    aria-live="polite"
                    className="mt-4 text-sm text-green-600 dark:text-green-400"
                >
                    <span className="block">Your message has been sent!</span>
                    <span className="block">Thank you for reaching out.</span>
                </p>
            )}
            {mutation.isError && (
                <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
                    {mutation.error instanceof Error ? mutation.error.message : "Something went wrong"}
                </p>
            )}
        </form>
    );
}
