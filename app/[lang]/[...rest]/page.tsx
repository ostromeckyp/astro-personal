import { notFound } from "next/navigation";

/** Sends unknown URLs to the not-found page inside the site's layout, in the right language. */
export default function CatchAll() {
  notFound();
}
