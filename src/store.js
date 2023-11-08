import { writable } from "svelte/store";
import { DB, db } from "./static/js/db";
import { toggleDarkClass } from "./static/js/extra";

let path = window.location.pathname;
export let active_tab = writable(path);


export let sidebarIsopen = writable(false);

let isDarkModdeOn = DB.get("darkmode") || false;

export let darkMode = writable(isDarkModdeOn);


if(isDarkModdeOn) {
  toggleDarkClass();
}


let defaultColors = [
  "#3A86FF",
  "#8338EC",
  "#FF006E",
  "#FB5607",
  "#FFBE0B",
]

export let colors = DB?.get("colors") ? DB.get("colors") : defaultColors;

export const userColors = writable(colors);

async function fetchUsername() {
  const user = await db.users.get(1);
  return user ? user.username : "default";
}

let username = await fetchUsername();

const defaultSettings = {
  username,
  maxRecommendation: DB.get("rec_no") || 3,
};


let settings = DB.get("storedSettings") || defaultSettings;

// create and export the userSettings store using the writable function
export const userSettings = writable(settings);