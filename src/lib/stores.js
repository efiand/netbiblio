import { writable } from "svelte/store";

export const isHomePage = writable(false);

export const authorsList = writable([]);

export const booksList = writable([]);

export const heading = writable({});
