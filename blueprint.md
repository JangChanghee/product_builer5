# Animal Face Test

## Overview

This is a web application that uses a machine learning model to classify whether a person's face resembles a dog or a cat. It uses a pre-trained model from Teachable Machine and the computer's webcam for real-time classification. The application is built with modern HTML, CSS, and JavaScript, utilizing a Web Component for a modular structure.

## Features

-   **Real-time Classification:** Uses a Teachable Machine model to classify faces from a live webcam feed.
-   **Webcam Integration:** Displays the webcam feed directly on the page.
-   **Prediction Display:** Shows the classification results (e.g., "Dog", "Cat") and their probabilities.
-   **Responsive Design:** Ensures a good user experience on various devices.
-   **Theme Switching (Dark/Light Mode):** A toggle button allows users to switch between dark and light themes.
-   **Web Component:** The core functionality is encapsulated within an `<animal-classifier>` Web Component.

## Design

-   **Layout:** A simple, centered layout that focuses on the webcam feed and the classification results.
-   **Typography:** Clear, readable fonts for labels and predictions.
-   **Color Scheme:** A playful and modern color scheme.
-   **User Feedback:** Clear visual indicators for the classification results.

## File Structure

-   `index.html`: The main HTML file that loads the necessary scripts and the web component.
-   `style.css`: Contains the global styles and theme variables.
-   `main.js`: Implements the `<animal-classifier>` web component, including the Teachable Machine logic.
-   `my_model/`: Directory containing the Teachable Machine model files (`model.json`, `metadata.json`, `weights.bin`).
-   `blueprint.md`: This file, containing the project documentation.
