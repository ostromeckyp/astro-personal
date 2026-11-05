import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Paweł Ostromecki",
    short_name: "Ostromecki",
    start_url: "/",
    display: "browser",
    background_color: "#000002",
    theme_color: "#000002",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
