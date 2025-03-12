# How to DIY render a canvas in your browser

Ingredients
1. any browser with developer tools

## Step 1: open developer tools
You can do this by right clicking on a new tab and click "inspect"
Then u need to go to the console, where u can excecute javascript
some browsers get mad at you for pasting code there as its a security risk, you can turn off that warning.

## Step 2: create a canvas in your browser
Copy the following code
```
// Create a canvas element
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 400;
canvas.height = 200;
```

## Step 3: draw something on the canvas

```
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
ctx.font = "20px Arial";
ctx.fillText("Hello, Canvas!", 120, 100);
```

## Step 4: extract the generated canvas
```
// Extract base64 image data
canvas.toDataURL("image/png");
```
