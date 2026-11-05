"use client";

import { useEffect, useState } from "react";
import type { ARTICLE as Copy } from "@/content/site/blog";

const ROUND = "inline-flex size-11 items-center justify-center rounded-full border border-ink-600 text-ink-200 hover:border-ink-500";

export function ShareLinks({ url, title, copy: ARTICLE }: { url: string; title: string; copy: typeof Copy }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const encoded = encodeURIComponent(url);

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 1600);
    return () => clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        aria-label={ARTICLE.shareLinkedIn}
        className={ROUND}
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        </svg>
      </a>
      <a
        href={`https://x.com/intent/post?url=${encoded}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noreferrer"
        aria-label={ARTICLE.shareX}
        className={ROUND}
      >
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      </a>
      <button
        type="button"
        onClick={copy}
        className="h-11 rounded-full border border-ink-600 px-3.5 text-[13px] text-ink-200 hover:border-ink-500"
      >
        <span aria-live="polite">{{ idle: ARTICLE.copy, copied: ARTICLE.copied, failed: ARTICLE.copyFailed }[status]}</span>
      </button>
    </div>
  );
}
