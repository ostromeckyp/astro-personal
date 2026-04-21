"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readInitialTheme(): Theme {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
}

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const initial = readInitialTheme();
        setThemeState(initial);
        applyTheme(initial);
        setMounted(true);
    }, []);

    const setTheme = useCallback((next: Theme) => {
        setThemeState(next);
        applyTheme(next);
    }, []);

    const toggle = useCallback(() => {
        setThemeState((prev) => {
            const next: Theme = prev === "dark" ? "light" : "dark";
            applyTheme(next);
            return next;
        });
    }, []);

    return {theme, setTheme, toggle, mounted};
}

/**
 * Inline script that runs before hydration to set the `dark` class and avoid FOUC.
 * Mirrors the logic of `readInitialTheme` but without React.
 */
export const themeBootstrapScript = `
(function() {
    try{
        var t=localStorage.getItem('theme'); 
        if(t !== 'dark' && t !== 'light') {
            t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
        } if(t==='dark') {
         document.documentElement.classList.add('dark');}}catch(e){}
       }
)();
`;
