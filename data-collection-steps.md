## How to collect da data

### Step 1: Copy the code in save-calls.js

### Step 2: Open your browser console and run the code. 
1. paste the code from save-calls.js (https://github.com/elisa-luo/double_edged_sword_crawler/blob/main/save-calls.js) into the browser console and press enter
2. paste the following code:
```
const testCalls = [
{
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "HTMLCanvasElement.width",
          "arguments": 240,
          "accessType": "set",
          "timeStamp": 1738800428499
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "HTMLCanvasElement.height",
          "arguments": 60,
          "accessType": "set",
          "timeStamp": 1738800428500
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.textBaseline",
          "arguments": "alphabetic",
          "accessType": "set",
          "timeStamp": 1738800428500
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.fillStyle",
          "arguments": "#f60",
          "accessType": "set",
          "timeStamp": 1738800428500
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.fillRect",
          "arguments": {
            "0": 100,
            "1": 1,
            "2": 62,
            "3": 20
          },
          "accessType": "call",
          "timeStamp": 1738800428500
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.fillStyle",
          "arguments": "#069",
          "accessType": "set",
          "timeStamp": 1738800428500
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.font",
          "arguments": "11pt \"Times New Roman\"",
          "accessType": "set",
          "timeStamp": 1738800428500
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.fillText",
          "arguments": {
            "0": "Cwm fjordbank gly 😃",
            "1": 2,
            "2": 15
          },
          "accessType": "call",
          "timeStamp": 1738800428505
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.fillStyle",
          "arguments": "rgba(102, 204, 0, 0.2)",
          "accessType": "set",
          "timeStamp": 1738800428505
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.font",
          "arguments": "18pt Arial",
          "accessType": "set",
          "timeStamp": 1738800428505
        },
        {
          "source": "https://demo.fingerprint.com/DBqbMN7zXxwl4Ei8/J5XlHIBN67YHskdR?apiKey=30AlhjJaxQ8eyfTZcCol&version=3&loaderVersion=3.11.4",
          "description": "CanvasRenderingContext2D.fillText",
          "arguments": {
            "0": "Cwm fjordbank gly 😃",
            "1": 4,
            "2": 45
          },
          "accessType": "call",
          "timeStamp": 1738800428508
        }
]
```
3. Run the following code:
```
downloadJSON(testAllSubsets(testCalls)); 
```
This should run the tests and initiate the download for a json file.
the console should also print: `analyzed 512 subsets` (or something like that)

### Step 4: Upload the data
Rename the json file to something like `elisa-chrome.json`, then upload it to the canvas-data folder. https://github.com/elisa-luo/double_edged_sword_crawler/tree/main/canvas-data

## Last step: repeat for each machine you have! Thanks!!!
