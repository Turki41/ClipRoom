export const saveVideo = async ({ blobUrl, blob }: { blobUrl: string, blob: Blob }) => {

    // Chrome and Edge
    if ('showSaveFilePicker' in window) {
        try {
            const handleSave = await (window as any).showSaveFilePicker({
                suggestedName: `recording-${new Date().toDateString()}.mp4`,
                types: [
                    {
                        description: "Video File",
                        accept: { "video/mp4": [".mp4"] }
                    }
                ]
            })

            const writable = await handleSave.createWritable()
            await writable.write(blob)
            await writable.close()
            return
            
        } catch (error) {
            console.warn("Picker cancelled, falling back to download.");
            return
        }
    }

    // Fallback for browsers without the File System Access API
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = `recording-${new Date().toDateString()}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}