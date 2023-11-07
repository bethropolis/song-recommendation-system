import { db } from "./db";

export async function checkIfDataAvailable() {
    // @ts-ignore
    let data = await db.openFiles.toArray();
    console.log(data.length >= 1)

    return data.length >= 1;
}


// a toggle dark class function (exported)
export function toggleDarkClass() {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
}

