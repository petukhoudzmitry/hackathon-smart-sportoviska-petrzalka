// Application to control an LED connected to GPIO 5 based on a GET request parameter `light`
// This application requires Node.js with an HTTP server running on a Raspberry Pi

// Usage:
// http://domain:[port]/?light=0 | 1 
// 0 - Turns off the LED, 1 - Turns on the LED

// By Dzmitry Petukhou, https://github.com/petukhoudzmitry
// Sample code for Hackathon 'Smart Sportoviska Petrzalka', Bratislava, Slovakia
// Date: 16.11.2024

// Import required modules
const url = require('url'); // For parsing request URLs and query parameters
const fs = require('fs');   // For reading and writing to files
const Gpio = require('onoff').Gpio;  // Import GPIO library (ensure the module is installed)
const LED_STATE_FILE = 'led_state.txt';  // Path to the file that stores the LED state

// Initialize HTTP server
var http = require('http').createServer(requestHandler);

// Initialize GPIO pin 5 as output (for controlling the LED)
var LED = new Gpio(535, 'out'); //Change 535 to the correct pin you find using the command 'cat /sys/kernel/debug/gpio | grep 5'

// Start the HTTP server and listen on port 8080
http.listen(8080);

// Function to read the current LED state from a file
function readLedState() {
    try {
        // Read the file and return the value (0 or 1)
        const data = fs.readFileSync(LED_STATE_FILE, 'utf8');
        return data.trim();
    } catch (err) {
        // If the file doesn't exist or there's an error, default to off (0)
        return '0';
    }
}

// Function to save the current LED state to a file
function saveLedState(state) {
    // Write the state (0 or 1) to the file
    fs.writeFileSync(LED_STATE_FILE, state, 'utf8');
}

// Request handler for the HTTP server
function requestHandler(req, res) {
    let currentState = readLedState();  // Get the current state of the LED

    // Parse the 'light' query parameter from the request URL
    let light = url.parse(req.url, true).query.light;

    // If 'light' parameter is valid (1 or 0), update the LED state
    if (light === '1' || light === '0') {
        currentState = light;
        saveLedState(currentState);  // Save the updated state to file
    }

    // Update the physical LED state based on the current value (0 or 1)
    LED.writeSync(parseInt(currentState));

    // Send a response back to the client with the current LED state
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(currentState);  // Send the current LED state (0 or 1)
    return res.end();  // End the response
}
