# LED Control Script for Raspberry Pi

This Node.js application allows you to control an LED connected to GPIO 5 of a Raspberry Pi via an HTTP GET request. The LED state is determined by a query parameter (`light`) in the URL.

## Features

- **Control LED State**: Turn the LED on or off by sending HTTP requests.
- **State Persistence**: The current LED state is saved in a file (`led_state.txt`) to retain the state across server restarts.
- **Simple and Lightweight**: Uses a basic HTTP server and the `onoff` library for GPIO control.

## How It Works

1. Start the server using Node.js.
2. Access the server in a web browser or through any HTTP client using the following URL format:
```bash
http://<domain>:8080/?light=0
```
- Replace `<domain>` with the IP or hostname of your Raspberry Pi.
- Use `light=1` to turn the LED **on** and `light=0` to turn it **off**.

3. The server processes the request, updates the LED state, and responds with the current state (`0` or `1`).

## Prerequisites

- A Raspberry Pi with GPIO pin 5 connected to an LED.
- Node.js installed on your Raspberry Pi.
- The `onoff` library installed:

## Notes
- Ensure you have the correct permissions to access GPIO pins. Run the script with sudo if required.
- Make sure your LED is correctly wired to GPIO pin 5 with an appropriate resistor to prevent damage.

## Author
Developed by Dzmitry Petukhou as a part of the Hackathon Smart Sportoviska Petržalka, Bratislava, Slovakia, on November 16, 2024.

GitHub: Dzmitry Petukhou
