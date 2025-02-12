# Dynamic Form with API & Manual Input Handling

This project implements a form that:

- Receives random values from an API (values are independent)
- Allows manual input with dynamic calculations (linked fields update based on user input)

## Preview

![Project Preview](preview.png)

## Features

- Fetches random values from an API (no calculations applied)
- Allows manual input with real-time recalculations
- UI differentiates between API-generated and user-modified values
- Dynamic updates:
  - Total = Quantity × Price (when manually updated)
  - Profit remains unchanged unless modified manually


### Frontend:

- Next.js (React, TypeScript) – UI and state management
- Tailwind CSS – Styling

## Installation & Setup

1. Clone the repository
   bash
   git clone https://github.com/your-repo/dynamic-form.git
   cd project

2. Install dependencies
   npm install

3. Run the development server
   npm run dev


## Usage

1. Click "Fetch API Data" to get random values (static display)
2. Manually update values in fields:
   - Changing Quantity or Price recalculates Total
   - Profit remains unchanged unless edited
   - UI dynamically updates linked fields when necessary

