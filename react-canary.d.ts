/// <reference types="react/canary" />

import type { ExoticComponent } from "react";

// Next.js 15 (with `experimental.viewTransition: true`) ships a vendored
// `react-experimental` build that exposes the ViewTransition component as
// `unstable_ViewTransition`. The canary `@types/react` declarations only
// expose it as `ViewTransition`, so we augment the module to expose the
// `unstable_ViewTransition` alias that actually exists at runtime.
declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unstable_ViewTransition: ExoticComponent<any>;
}
