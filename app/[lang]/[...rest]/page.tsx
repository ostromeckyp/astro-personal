import { notFound } from "next/navigation";

// The layout only allows prerendered languages; unknown paths below them must still reach notFound() here.
export const dynamicParams = true;

/** Sends unknown URLs to the not-found page inside the site's layout, in the right language. */
export default function CatchAll() {
  notFound();
}
