# Picture to Data Angular Application

This is a single-page Angular application that allows users to capture or upload an image containing tabular data, extract data from the image, render the extracted data in an interactive table UI, and view basic information about any row using a Product Details Component.

## Table of Contents

- [Features](#features)
- [Core Requirements](#core-requirements)
- [Bonus Features](#bonus-features)
- [Project Setup Instructions](#project-setup-instructions)
- [OCR / Mock Data Explanation](#ocr--mock-data-explanation)
- [Screenshots / Demo Video](#screenshots--demo-video)
- [Assumptions](#assumptions)
- [Deployed Application](#deployed-application)

## Features

- Capture or upload an image containing tabular data.
- Extract data from the image (simulated using Tesseract.js for OCR).
- Render the extracted data inside an interactive Table UI (Angular Material Table).
- View basic information about any row using a Product Details Component.

## Core Requirements

### A. Angular Project Setup

- Created with Angular CLI (latest version).
- Clean folder structure (`components/`, `services/`, `models/`).
- Uses Angular Reactive Forms for image upload.
- Uses routing for navigating between List → Details screens.

### B. Image Upload & Convert to Data (`ImageToDataComponent`)

- Allows uploading an image file from the device.
- "Convert to Table" button triggers OCR process.
- App converts image to JSON using Tesseract.js (or mock data if OCR fails).
- Shows loading states during conversion.
- Handles invalid or empty images with user-friendly alerts.

### C. Product List Component (`ProductListComponent`)

- Displays extracted tabular data in an Angular Material Table.
- Columns: Product Name, Category, Quantity, Price.
- Search bar for filtering rows.
- Sorting for columns.
- Pagination.
- Clicking on a row navigates to Product Details page (`/products/:id`).

### D. Product Details Component (`ProductDetailsComponent`)

- Shows complete information of the selected row.
- UI card-style layout using Angular Material.
- Back button returns to product list.
- Shows fields like Product Name, Category, Description, Quantity, Price.

## Bonus Features

- **Download CSV Button**: Exports the current table data to a CSV file.
- **Analytics Summary**: Displays total products, total inventory value, and number of categories.
- **Grid View / Table View Toggle**: Allows switching between a tabular view and a card-based grid view for products.

## Project Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository_link>
    cd picture-to-data
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    ng serve -o
    ```
    This will open the application in your default browser at `http://localhost:4200/`.

4.  **Build for production:**
    ```bash
    ng build
    ```

## OCR / Mock Data Explanation

- The application uses **Tesseract.js** for Optical Character Recognition (OCR) to extract text from uploaded images.
- The `OcrService` (located at `src/app/services/ocr.service.ts`) encapsulates the Tesseract.js logic.
- Due to the complexity of accurately parsing arbitrary tabular data from OCR output, the `OcrService` currently implements a simplified parsing mechanism. It extracts a few lines of text and attempts to construct a single `Product` object from it. For a production-ready application, this parsing logic would need significant enhancement, possibly involving machine learning models or more sophisticated rule-based parsing.
- A `DataService` (`src/app/services/data.service.ts`) is used to store and manage the extracted product data across components.
- During initial development and for demonstration purposes, if no data is extracted via OCR, the `ProductListComponent` can optionally fall back to a hardcoded `MOCK_PRODUCTS` array (defined in `src/app/models/product.model.ts`). This fallback is currently disabled to ensure real OCR data is used.

## Screenshots / Demo Video

**(Placeholder for Screenshots and/or Demo Video)**

## Assumptions

- The user will upload images containing relatively clean, legible tabular data for optimal OCR results.
- The OCR parsing logic is simplified for this assignment and would require further development for robust real-world use cases.
- Browser support for `MediaDevices.getUserMedia()` for camera capture is optional and not fully implemented in this version, focusing primarily on file uploads.
- Angular Material is used for UI components and styling, providing a consistent and responsive design.

## Deployed Application

**(Placeholder for Deployed Application Link)**
