# AutoUpdate for Anilist / Chrome Extension

This is a Chrome extension for automatically updating your [Anilist.co](https://anilist.co/) profile when you have completed watching a media item.

## Download and Test

1. Download the repository (click "Code" -> "Download ZIP").
2. From Chrome -> Manage Extensions, click "Load unpacked" and **select the "app" directory** of this repository on your local machine.
3. Navigate to a supported anime site (e.g., crunchyroll.com) and test.

## Development Details

### High-Level Extension Structure

`background.js` runs on extension activation and calls `chrome.declarativeContent.ShowPageAction()` when specific websites are visited. `ShowPageAction()` displays `popup.html` and the corresponding .js and .css files.

Content on individual websites is read by use of a [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/), which is injected into pages that match the given criteria. Content scripts run independently (inside the browser tab) from the extension and therefore can only communicate back to the extension by use of [message passing](https://developer.chrome.com/docs/extensions/mv3/messaging/).

The extension (`background.js`) listens for messages by setting a listener with `chrome.runtime.onMessage.addListener()`.

The content script performs work on the page and passes messages to the extension (`background.js`) by use of `chrome.runtime.sendmessage()`. The background page receives the message and stores in on the global `windows` object.

The popup script retrieves the global windows object with `chrome.runtime.getBackgroundPage()` and thereby accesses the message passed from the content script.
