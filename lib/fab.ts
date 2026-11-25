import { isActive } from "./nav";

/**
 * Whether the mobile quick-contact button should be on screen. `path` is locale-stripped.
 * It steps aside on the contact page (the form is right there), while the footer (which has
 * the same links) is visible, and while the reader scrolls down into the content.
 */
export function fabVisible({ path, footerInView, scrollingDown }: { path: string; footerInView: boolean; scrollingDown: boolean }): boolean {
  return !isActive(path, "/contact") && !footerInView && !scrollingDown;
}
