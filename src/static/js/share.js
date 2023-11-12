// @ts-nocheck
import { colors } from "../../store";
import { DB, db } from "./db";

async function exportData(username, openFiles) {

    if (username && username == "default") {
        username = prompt("Please enter your username for export:");
        await db.users.update(1, { username });
    }

    const exportObj = {
        user: username,
        colors: colors,
        openFiles: openFiles,
        timestamp: Date.now(),
    };

    const jsonData = JSON.stringify(exportObj);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `songPlaylist_${username}.json`;
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
}

// @ts-ignore
export async function handleExportButtonClick() {
    // @ts-ignore
    const username = await db.users.orderBy(':id').first();
    console.log("🚀 ~ file: share.js:36 ~ handleExportButtonClick ~ username:", username)


    // @ts-ignore
    const openFiles = await db.openFiles.toArray()

    if (username.username != undefined) {
        exportData(username?.username, openFiles);
    } else {
        exportData("default", openFiles)
    }
}


// Function to handle the file upload
export async function handleSharedDataUpload(event) {
    const fileInput = event.target;
    const files = fileInput.files;

    const uploadPromises = [];
    let errorMessage = '';

    for (const file of files) {
        const uploadPromise = new Promise(async (resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async function (e) {
                try {
                    const fileData = JSON.parse(e.target.result);

                    if (!fileData || !fileData.user || !fileData.openFiles) {
                        errorMessage = "Invalid JSON schema.";
                    }

                    if (!errorMessage) {
                        const sharedData = {
                            userId: fileData.user,
                            colors: fileData.colors,
                            data: fileData.openFiles,
                            timestamp: fileData.timestamp,
                        };


                        await db.sharedData.put(sharedData);
                        console.log(`Shared data uploaded and stored in the database.`);
                        resolve();
                    } else {
                        // You can handle the case of invalid JSON format here
                        console.error(errorMessage);
                        reject(new Error(errorMessage));
                    }
                } catch (error) {
                    console.error("Error while parsing JSON:", error);
                    reject(error);
                }
            };

            reader.readAsText(file);
        });

        uploadPromises.push(uploadPromise);
    }

    try {
        await Promise.all(uploadPromises);
        return errorMessage ? { success: false, message: errorMessage } : { success: true, message: 'Files uploaded successfully, click refresh icon.' };
    } catch (error) {
        return { success: false, message: errorMessage || 'Error uploading shared data' };
    }
}

