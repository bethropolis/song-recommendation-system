// @ts-nocheck
import { db } from "./db";

function exportData(username, openFiles) {
    const exportObj = {
        user: username,
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
    const username = await db.users.get(1);

    // @ts-ignore
    const openFiles = await db.openFiles.toArray()
    exportData(username.username, openFiles);
}



// Function to handle the file upload
export function handleSharedDataUpload(event) {
    const fileInput = event.target;
    const files = fileInput.files;

    for (const file of files) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            try {
                const fileData = JSON.parse(e.target.result);

                if (!fileData || !fileData.user || !fileData.openFiles) {
                    console.error("Invalid JSON format.");
                    return;
                }

                const sharedData = {
                    userId: fileData.user,
                    data: fileData.openFiles,
                    timestamp: fileData.timestamp,
                };

                await db.sharedData.put(sharedData).then(() => {
                    console.log(`Shared data uploaded and stored in the database.`);
                });
            } catch (error) {
                console.error("Error while parsing JSON:", error);
            }
        };

        reader.readAsText(file);
    }
}