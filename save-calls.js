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

/**
 * Generates and prints all non-empty subsets of elements from a JSON object
 * @param {JSON} jsonData - JSON containing an array
 */
function printAllSubsets(jsonData) {
  const exempted_calls = [
    "HTMLCanvasElement.width",
    "HTMLCanvasElement.height",
  ];

  try {
    // Check if the data is an array
    if (!Array.isArray(jsonData)) {
      console.error("Error: The JSON object must contain an array");
      return;
    }

    const n = jsonData.length;

    // Create a base mask for required elements
    let baseMask = 0;
    for (let j = 0; j < n; j++) {
      for (const call of exempted_calls) {
        if (jsonData[j].description && jsonData[j].description.includes(call)) {
          baseMask |= 1 << j;
          break;
        }
      }
    }

    // Generate all possible subsets (excluding empty set)
    const subsets = [];

    // Loop through all possible binary numbers from 1 to 2^n - 1
    // Each binary number represents a subset
    for (let i = 1; i < 1 << n; i++) {
      if ((i & baseMask) !== baseMask) {
        continue;
      }
      const subset = [];

      // Check each bit of the binary number
      for (let j = 0; j < n; j++) {
        // If the j-th bit is set, include the j-th element
        if (i & (1 << j)) {
          subset.push(jsonData[j]);
        } else if (
          jsonData[j].description.includes("width") ||
          jsonData[j].description.includes("height")
        ) {
          subset.push(jsonData[j]);
        }
      }

      subsets.push(subset);
    }

    // Optional: Sort subsets by size (from largest to smallest)
    // subsets.sort((a, b) => b.length - a.length);

    // Print all subsets
    for (const subset of subsets) {
      replayCanvasCalls(subset);
    }
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
  }
}

