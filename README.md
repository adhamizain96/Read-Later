# Read-Later
The 'Read Later' extension empowers users to effortlessly save web pages for future reading.

The popup.js file is responsible for the functionality and behavior of the extension's popup window. It contains JavaScript code that interacts with the browser's extension APIs and handles user interactions. The script includes functions for saving the current page's URL, rendering the saved URLs in the popup, and extracting the domain from a URL. It utilizes the chrome.tabs API to query and access information about the active tab.

The popup.html file defines the structure and layout of the popup window that appears when the user clicks on the extension's button in the browser toolbar. It includes HTML markup to create the desired user interface for the extension. The HTML structure consists of a header with a title, an unordered list to display the saved URLs, and a script tag to link the JavaScript code in popup.js to the HTML file.

The manifest.json file serves as the manifest for the extension, providing essential information about its name, version, permissions, scripts, and other settings. It is required for Chrome extensions and defines the behavior and capabilities of the extension. The manifest file specifies the necessary permissions (storage, activeTab), sets the default popup HTML file (popup.html), and includes the required background script (background.js) and icon file (icon.png). It also defines the manifest version as 2, which is the older version of Chrome extensions.

Together, these three components (popup.js, popup.html, and manifest.json) work together to create a functional and visually appealing browser extension. The JavaScript code in popup.js handles the logic, the HTML structure in popup.html defines the user interface, and the manifest file (manifest.json) specifies the extension's settings and permissions.
