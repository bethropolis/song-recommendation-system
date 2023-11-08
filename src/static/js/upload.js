// @ts-nocheck
import { db } from "./db";

export async function handleFileUpload(event) {
  const fileInput = event.target;
  const files = fileInput.files;

  const uploadPromises = [];

  let errorMessage = ''; // Initialize an empty error message
  for (const file of files) {
    const uploadPromise = new Promise(async (resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function (e) {
        const fileData = JSON.stringify(e.target.result);

        if ((JSON.parse(e.target.result)).user !== undefined) {
          errorMessage = `Wrong data format in ${file.name}`; // Set the error message
        }

        if (!errorMessage) {
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
        } else {
          // You can handle the case of wrong data format here
          console.error(errorMessage);
          reject(new Error(errorMessage));
        }
      };

      reader.readAsText(file);
    });

    uploadPromises.push(uploadPromise);
  }

  try {
    await Promise.all(uploadPromises);
    return errorMessage ? { success: false, message: errorMessage } : { success: true, message: 'Files uploaded successfully' };
  } catch (error) {
    return { success: false, message: errorMessage || 'Error uploading files' };
  }
}
