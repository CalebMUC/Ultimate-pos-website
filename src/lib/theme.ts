/**
 * Light (white) is the default theme. Dark is opt-in through the theme toggle and
 * remembered in localStorage on the visitor's device.
 */
export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "ultimatepos-theme";

/**
 * Runs in <head> before first paint so a visitor who chose dark never sees a white flash.
 * Also marks <html class="js"> so CSS can tell when JavaScript is running (the `js:` variant).
 * Kept tiny and dependency-free; the CSP must allow it (see next.config.ts).
 */
export const themeInitScript = `document.documentElement.classList.add("js");try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;
