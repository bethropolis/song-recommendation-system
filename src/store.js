import { writable } from "svelte/store";

let path = window.location.pathname; 
export let active_tab = writable(path);
