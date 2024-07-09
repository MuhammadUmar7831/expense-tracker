[![Demo Video](https://img.youtube.com/vi/xubgkf-Q8_A/maxresdefault.jpg)](https://www.youtube.com/watch?v=-KOquqEd7zo)

# Spend Smart - Expense Tracker Web Application

Spend Smart is an intuitive and feature-rich expense tracker web application designed to help you manage your finances effortlessly. Built using modern technologies, Spend Smart offers a seamless and user-friendly experience.

## Live Site
Check out the live application [here](https://spend-smart-two.vercel.app/).

## Demo Video
Watch a demo of Spend Smart on YouTube [here](https://www.youtube.com/watch?v=xubgkf-Q8_A).

## Portfolio
Visit my portfolio [here](https://muhammad-umar.vercel.app/).

## Features

### Landing Page
- Welcoming and guiding users to sign up or log in using Google authentication.
- JWT token storage in cookies to ensure users don't need to re-authenticate every time.

### Dashboard
#### Stats Page
- Overview cards showing total budget amounts, total spending amounts, and the number of budgets.
- Bar chart displaying the latest five budgets with their total amounts and spent money.
- Latest budgets cards and a detailed table of the latest expenses.

#### Budget Page
- View all budgets with details including total amount, spending, emoji, and name.
- "View Detail" button to open a detailed page of the selected budget.
- Options to add, edit, or delete expenses and modify or delete the budget itself.
- Expenses displayed in an editable table.

#### Expenses Page
- Comprehensive table listing all expenses using the same table component as in the Stats and Budget pages.

## Technologies Used
- **MongoDB**: Database for storing user data, budgets, and expenses.
- **React**: Front-end library for building the user interface.
- **Express**: Back-end framework for handling server-side logic.
- **Node.js**: JavaScript runtime for server-side development.
- **Firebase**: Google authentication for secure login and signup.
- **Redux Toolkit**: State management for a seamless user experience.
- **TailwindCSS**: Utility-first CSS framework for styling the application.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Firebase account

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MuhammadUmar7831/expense-tracker.git
   cd expense-tracker

### ENV
1. client
   ```bash
   VITE_FIREBASE_API_KEY=firebase_api_key
   VITE_API_URL=http://localhost:3000
2. server
   ```bash
   MONGO_URI=mongodb_connection_string
   SALT=16
   JWT_SECRET=secret_key
   CLIENT_URL=http://localhost:5173
