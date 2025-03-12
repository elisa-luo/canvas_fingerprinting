function replayCanvasCalls(savedCalls) {
    // Create and configure the canvas
    const canvas = document.createElement("canvas");
    canvas.width = 300; // Set appropriate width
    canvas.height = 150; // Set appropriate height
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Iterate over saved calls and apply them to the canvas
    savedCalls.forEach(call => {
        const propertyMatch = call.description.match(/CanvasRenderingContext2D\.(.+)|HTMLCanvasElement\.(.+)/);
        if (!propertyMatch) return;

        const contextProperty = propertyMatch[1]; // Context method/property
        const canvasProperty = propertyMatch[2]; // Canvas method (like toDataURL)

        if (call.accessType === "set" && contextProperty) {
            // Set properties like fillStyle, font, textBaseline, etc.
            ctx[contextProperty] = call.arguments;
        } else if (contextProperty) {
            // Call methods like fillRect, fillText, etc.
            const args = Object.values(call.arguments);
            if (typeof ctx[contextProperty] === "function") {
                ctx[contextProperty](...args);
            }
        } 
        
        if (canvasProperty === "toDataURL") {
            // Handle toDataURL extraction
            const imageData = canvas.toDataURL("image/png");
            console.log("Canvas image data URL:", imageData);

            // Create a download link
            const link = document.createElement("a");
            link.href = imageData;
            link.download = "canvas_image.png";
            link.textContent = "Download Image";
            document.body.appendChild(link);
        }
    });

    console.log("Canvas calls have been replayed.");
}