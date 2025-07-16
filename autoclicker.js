const robot = require('robotjs');

let clickIntervalID = null;
let isClickerRunning = false;

function start(interval, clickType) {
  if (clickIntervalID !== null) {
    throw new Error('Auto-clicker is already running.');
  }
  
  // Validate click type
  const validClickTypes = ['left', 'middle', 'right'];
  if (!validClickTypes.includes(clickType)) {
    throw new Error('Invalid click type. Must be left, middle, or right.');
  }
  
  // Validate interval
  if (typeof interval !== 'number' || interval < 1) {
    throw new Error('Invalid interval. Must be a positive number.');
  }
  
  try {
    // Set speed for robotjs (0 = fastest, 10 = slowest)
    robot.setMouseDelay(2);
    
    // Use setInterval to simulate mouse clicks repeatedly
    clickIntervalID = setInterval(() => {
      try {
        robot.mouseClick(clickType);
      } catch (err) {
        console.error('Error simulating mouse click:', err);
        // Continue running even if individual clicks fail
      }
    }, interval);
    
    isClickerRunning = true;
    console.log(`Auto-clicker started: ${clickType} click every ${interval}ms`);
    
  } catch (error) {
    console.error('Failed to start auto-clicker:', error);
    throw new Error('Failed to initialize auto-clicker: ' + error.message);
  }
}

function stop() {
  if (clickIntervalID !== null) {
    clearInterval(clickIntervalID);
    clickIntervalID = null;
    isClickerRunning = false;
    console.log('Auto-clicker stopped');
  }
}

function isRunning() {
  return isClickerRunning;
}

// Cleanup function for graceful shutdown
function cleanup() {
  stop();
}

// Handle process termination
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

module.exports = { 
  start, 
  stop, 
  isRunning,
  cleanup 
};
