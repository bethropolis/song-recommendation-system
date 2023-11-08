import { darkMode } from "../../store";
import { DB, db } from "./db";

export async function checkIfDataAvailable() {
  // @ts-ignore
  let data = await db.openFiles.toArray();

  return data.length >= 1;
}


// a toggle dark class function (exported)
export function toggleDarkClass() {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
  darkMode.update((value) => !value);
  DB.set("darkmode", !DB.get("darkmode"));
}

