// @ts-nocheck
import { db } from "./db";

export async function handleFileUpload(event) {
  const fileInput = event.target;
  const files = fileInput.files;

  const uploadPromises = [];

  for (const file of files) {
    const uploadPromise = new Promise(async (resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function (e) {
        const fileData = JSON.stringify(e.target.result);

        const uploadedFile = {
          fileName: file.name,
          fileData,
          timestamp: new Date(),
        };

        try {
          await db.openFiles.put(uploadedFile);
          await db.userUploadedFiles.put(uploadedFile);
          console.log(`${file.name} uploaded and stored in the database.`);
          resolve();
        } catch (error) {
          console.error(`Error uploading ${file.name}: ${error}`);
          reject(error);
        }
      };

      reader.readAsText(file);
    });

    uploadPromises.push(uploadPromise);
  }

  try {
    await Promise.all(uploadPromises);
    return true;
  } catch (error) {
    return false; 
  }
}
