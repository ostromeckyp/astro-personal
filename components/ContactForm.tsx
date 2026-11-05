"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useContactMutation } from "@/app/hooks/use-contact-mutation";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { CONTACT } from "@/content/site/contact";
import { cn } from "@/lib/cn";
import { CONTACT_TOPICS, type ContactInput, contactSchema } from "@/lib/contact-schema";

const { form: copy, success } = CONTACT;

const FIELD =
  "rounded-input border border-ink-600 bg-ink-950 text-base text-ink-0 outline-none placeholder:text-ink-400 focus:border-sakura-500 focus:shadow-[0_0_0_4px_rgba(250,9,128,0.18)] aria-invalid:border-sakura-300";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-[13px] text-sakura-300">
      {message}
    </p>
  );
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: "workflow", name: "", email: "", company: "", message: "", website: "" },
  });
  const topic = useWatch({ control, name: "topic" });
  const mutation = useContactMutation();

  if (mutation.isSuccess) {
    return (
      <div role="status" className="flex min-h-[480px] flex-col justify-center gap-4">
        <span aria-hidden="true" className="h-0.5 w-10 bg-sakura-500" />
        <span className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em]">{success.title}</span>
        <span className="text-base leading-[1.6] text-ink-400">{success.body}</span>
        <TextLink href="/use-cases" className="self-start">
          {success.link}
        </TextLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate className="relative flex flex-col gap-[22px]">
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-[13px] text-ink-400">{copy.need}</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TOPICS.map((t) => {
            const pressed = t.value === topic;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={pressed}
                onClick={() => setValue("topic", t.value)}
                className={cn(
                  "h-10 rounded-full border px-4 text-sm transition-colors",
                  pressed ? "border-ink-0 bg-ink-0 text-ink-950" : "border-ink-600 text-ink-200 hover:border-ink-500",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[13px] text-ink-400">
            {copy.name}
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            aria-invalid={!!errors.name || undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(FIELD, "h-[52px] px-4")}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[13px] text-ink-400">
            {copy.email}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            aria-invalid={!!errors.email || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(FIELD, "h-[52px] px-4")}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="text-[13px] text-ink-400">
          {copy.company} <span className="text-ink-400">{copy.optional}</span>
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          placeholder={copy.companyPlaceholder}
          aria-invalid={!!errors.company || undefined}
          aria-describedby={errors.company ? "company-error" : undefined}
          className={cn(FIELD, "h-[52px] px-4")}
          {...register("company")}
        />
        <FieldError id="company-error" message={errors.company?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[13px] text-ink-400">
          {copy.message}
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder={copy.messagePlaceholder}
          aria-invalid={!!errors.message || undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(FIELD, "resize-y px-4 py-3.5 leading-normal")}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot, hidden from real users */}
      <div className="absolute top-0 left-0 -z-10 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {mutation.isError && (
        <p role="alert" className="text-sm text-sakura-300">
          {mutation.error instanceof Error ? mutation.error.message : copy.errorFallback}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] text-ink-400">{copy.privacy}</span>
        <Button type="submit" size="lg" disabled={mutation.isPending} aria-busy={mutation.isPending}>
          {mutation.isPending ? copy.sending : copy.send}
        </Button>
      </div>
    </form>
  );
}
