# Interactive Equilateral Triangle

This project creates an interactive equilateral triangle visualization using HTML, CSS, and JavaScript. Users can hover over the triangle to see real-time coordinates and height measurements.

## Features

- Interactive equilateral triangle
- Real-time coordinate display
- Dynamic height measurements for all sides
- Implemented as a Web Component for easy reuse

## Usage

1. Include the `triangle-component.js` file in your HTML:

   ```html
   <script src="triangle-component.js" type="module"></script>
   ```

2. Use the custom element in your HTML:

   ```html
   <interactive-triangle></interactive-triangle>
   ```

3. Hover over the triangle to see the dot move and coordinates update.
4. Observe the changing height measurements for each side.

## Files

- `interactive-triangle-correct-height.html`: Main HTML file demonstrating the use of the web component.
- `triangle-component.js`: JavaScript file containing the Web Component implementation.
- `triangleUtils.js`: JavaScript utility functions for triangle calculations.

## Development

To run the project locally:

1. Clone the repository
2. Set up a local web server (e.g., using Python's `http.server` or Node.js's `http-server`)
3. Open the `interactive-triangle-correct-height.html` file in a web browser

## Screenshot

![Interactive Equilateral Triangle](https://github.com/user-attachments/assets/028e2b10-18f3-4d1e-b368-df2c38a1780a)
