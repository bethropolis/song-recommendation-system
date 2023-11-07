import { writable } from "svelte/store";
import { DB, db } from "./static/js/db";

let path = window.location.pathname; 
export let active_tab = writable(path);

let defaultColors = [
    "#3A86FF",
    "#8338EC",
    "#FF006E",
    "#FB5607",
    "#FFBE0B",
  ]

let colors = DB.get("colors") || defaultColors;

export const userColors = writable(colors);

async function getUsername(){
    let usr = await db.users.get(1);
    return usr.username;
}

let username = getUsername();

const defaultSettings = {
    username,
    maxRecommendation:DB.get("rec_no") || 3,
  };


 let settings = DB.get("storedSettings") || defaultSettings;
  
  // create and export the userSettings store using the writable function
  export const userSettings = writable(settings);