
function replayCanvasCalls(savedCalls) {
    // Create and configure the canvas
    const canvas = document.createElement("canvas");
    canvas.width = 300; // Set appropriate width
    canvas.height = 150; // Set appropriate height
    // document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Iterate over saved calls and apply them to the canvas
    for (let i = 0; i < savedCalls.length; i++) {
        const call = savedCalls[i];
        const propertyMatch = call.description.match(/CanvasRenderingContext2D\.(.+)|HTMLCanvasElement\.(.+)/);
        
        if (!propertyMatch) continue;
    
        const contextProperty = propertyMatch[1]; // Context method/property
        const canvasProperty = propertyMatch[2]; // Canvas method (like toDataURL)
    
        if (canvasProperty === "toDataURL") {
            // Handle toDataURL extraction
            const imageData = canvas.toDataURL("image/png");
            return imageData;
            // console.log("Canvas image data URL:", imageData);
    
            // for our purposes, we can assume that toDataURL is the last call
            // console.log("hererere");
    
            // Create a download link
            // const link = document.createElement("a");
            // link.href = imageData;
            // link.download = "canvas_image.png";
            // link.textContent = "Download Image";
            // document.body.appendChild(link);
        }
    
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
    }    

    console.log("Canvas calls have been replayed.");
    return "error";  // as we assume that the last call is always toDataURL
}

/**
 * Generates and prints all non-empty subsets of elements from a JSON object
 * @param {JSON} jsonData - JSON containing an array
 */
function testAllSubsets(jsonData) {
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
    const imageDataMapping = [];
    const encodedSubsets = [];


    // Loop through all possible binary numbers from 1 to 2^n - 1
    // Each binary number represents a subset
    for (let i = 1; i < 1 << n; i++) {
      if ((i & baseMask) !== baseMask) {
        continue;
      }
      const subset = [];
      const encodedSubset = [];

      // Check each bit of the binary number
      for (let j = 0; j < n; j++) {
        // If the j-th bit is set, include the j-th element
        if (i & (1 << j)) {
          subset.push(jsonData[j]);
          encodedSubset.push(j);
        } else if (
          jsonData[j].description.includes("width") ||
          jsonData[j].description.includes("height")
        ) {
          subset.push(jsonData[j]);
          encodedSubset.push(j);
        }
      }
      // add toDataURL to the end of all subsets
      subset.push({
        description: "HTMLCanvasElement.toDataURL",
        accessType: "call",
      });

      subsets.push(subset);
      encodedSubsets.push(encodedSubset);
    }

    // Optional: Sort subsets by size (from largest to smallest)
    // subsets.sort((a, b) => b.length - a.length);

    // Print all subsets
    subsets.forEach((subset, index) => {
      const encodedSubset = encodedSubsets[index];
      let imageData = replayCanvasCalls(subset);
      // console.log("Canvas image data URL:", imageData);
    
      // Store the subset and corresponding image data in the mapping
      imageDataMapping.push({
        // subset: subset.map(item => item.description),  // Just store descriptions of the calls in the subset
        encodedSubset: encodedSubset,
        imageData: imageData,
      });
    });
    console.log("Done: analyzed " + subsets.length + " subsets");
    return imageDataMapping;
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
  }
}

function downloadJSON(data, filename = 'data.json') {
  const jsonString = JSON.stringify(data, null, 2); // Pretty print with 2 spaces
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
