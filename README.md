# Canvas Fingerprint Collector
Extended a version of the DDG Tracker Radar Collector

## Abstract
Who Drew on My Canvas? Characterizing Canvas Fingerprinting Across the Web
Canvas fingerprinting is a modern cross-site tracking technique that does not require user consent or draw user attention. This work presents an analysis of today’s usage of Canvas fingerprinting across the Web and evaluates its usage for cross-site tracking. We analyze the HTML Canvas API calls and extracted canvases and form clusters of identical canvas extractions found on different websites. This allows us to identify distinct entities performing Canvas fingerprinting and infer the usage of Canvas fingerprinting for cross-site user re-identification versus security purposes. Finally, we explore several techniques commercial fingerprinters use to evade anti-fingerprinting defenses.

## How do I use it?

### Use it from the command line

1. Clone this project locally (`git clone https://github.com/asumansenol/double_edged_sword_crawler.git`)
2. Install all dependencies (`npm i`)
3. Run the command line tool with the desired collector's (listed above) id(s):
```sh
npm run crawl -- -u 'https://kangax.github.io/jstests/toDataUrl_mime_type_test/' -o ./data/ -v -f -d "fingerprints"  --reporters 'cli,file' -l ./data/
```
This is the expected output:
```sh
kangax.github.io: fingerprints init took 0.000s
kangax.github.io: page context initiated in 0.000s
kangax.github.io: fingerprints postLoad took 0.000s
kangax.github.io: Cookie accepted: false
kangax.github.io: getting fingerprints data took 0.503s
Site 1 / 1 (100.0%)
Processing "https://kangax.github.io/jstests/toDataUrl_mime_type_test/" took 9.036s.

✅ Finished successfully.
Finish time: Wed, 19 Feb 2025 23:02:56 GMT
Sucessful crawls: 1/1 (100.00%)
Failed crawls: 0/1 (0.00%)
```

The results should be saved in the /data  directory as a .json file and look something like this:
```
{
  "initialUrl": "https://kangax.github.io/jstests/toDataUrl_mime_type_test/",
  "finalUrl": "https://kangax.github.io/jstests/toDataUrl_mime_type_test/",
  "timeout": false,
  "testStarted": 1740006167845,
  "testFinished": 1740006175927,
  "data": {
    "fingerprints": {
      "callStats": {
        "https://kangax.github.io/jstests/toDataUrl_mime_type_test/": {
          "CanvasRenderingContext2D.fillStyle": 1,
          "CanvasRenderingContext2D.strokeStyle": 1,
          "CanvasRenderingContext2D.fillRect": 1,
          "HTMLCanvasElement.toDataURL": 10
        }
      },
      "savedCalls": [
        {
          "source": "https://kangax.github.io/jstests/toDataUrl_mime_type_test/",
          "description": "CanvasRenderingContext2D.fillStyle",
          "arguments": "red",
          "accessType": "set",
          "timeStamp": 1740006168689
        },
        { ...
```
