
Built by https://www.blackbox.ai

---

# heheautoclicker

A replica clone of Murgee Auto Mouse Click, renamed to **heheautoclicker**. This application automates mouse clicks based on user-defined settings.

## Project Overview

The **heheautoclicker** application provides a user-friendly interface to set up and control an auto-clicker. Users can specify the interval (in milliseconds) between clicks and the type of mouse button to click (left, middle, or right). The application also supports global keyboard shortcuts to start and stop clicking.

## Installation

To install and run **heheautoclicker**, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/heheautoclicker.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd heheautoclicker
   ```

3. **Install the dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

4. **Start the application**:
   ```bash
   npm start
   ```

## Usage

Once the application is running, you can set your desired click interval and select the mouse button type from the interface. Click the "Start Clicking" button or press `F8` to start the auto-clicking process. You can stop the clicking by either clicking the "Stop Clicking" button or pressing `F8` again.

### Instructions:
- Set the desired click interval in milliseconds (minimum 1ms, maximum 10000ms).
- Choose which mouse button to click (Left, Middle, Right).
- Click "Start Clicking" or press `F8` to begin.
- The auto-clicker will click at your current mouse position.
- Press `F8` or click "Stop Clicking" to stop.

## Features

- Easy to use interface for configuring click settings.
- Supports multiple mouse button types: left, middle, and right.
- Global keyboard shortcut (`F8`) to toggle the auto-clicker on and off.
- Adjustable click interval to customize the clicking speed.

## Dependencies

This project has the following dependencies:

- **electron**: ^27.0.0
- **robotjs**: ^0.6.0

These dependencies will be installed automatically when you run `npm install`.

## Project Structure

The project's structure is as follows:

```
heheautoclicker/
├── index.html          # The main HTML file for the application's UI
├── main.js             # Main process script for Electron
├── package.json        # Project metadata and dependencies
├── preload.js          # Preload script for context bridge and IPC communication
├── renderer.js         # Frontend script for handling UI interactions (currently empty)
├── style.css           # Styles for the application
└── autoclicker.js      # Auto-clicker logic and settings handling
```

Feel free to explore the code and modify it as necessary. Happy clicking!