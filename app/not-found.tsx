import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="site-container flex min-h-[70vh] flex-col items-start justify-center gap-6 py-24">
      <span className="font-mono text-[13px] text-sakura-500">404</span>
      <h1 className="text-[clamp(48px,6vw,88px)] leading-[0.95] font-semibold tracking-[-0.045em]">Page not found.</h1>
      <p className="max-w-[560px] text-lg leading-[1.6] text-ink-400">This page doesn&apos;t exist or has moved.</p>
      <Button href="/" size="lg">
        Back to home
      </Button>
    </div>
  );
}
