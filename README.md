# About Mentor Match 2.0 

This project is a complete **rewrite** of my original personal application for frontend. It's a fun and challenging exercise to move away from a traditional **React Single-Page Application (SPA) with Vite** and embrace the power of **Next.js** for routing, server-side rendering.

The primary goal of this rewrite is to gain hands-on experience and proficiency with **TypeScript** and the Next.js framework.

---

## Project Goals 

1.  **TypeScript Migration:** Converting the entire codebase from JavaScript to a strongly-typed TypeScript structure. This includes defining clear interfaces and types for props, state, and data fetching.
2.  **Next.js Architecture:** Understanding and implementing the Next.js **App Router** for routing, layouts, and data fetching.
3.  **Client vs. Server Components:** Correctly identifying when to use **'use client'** and leveraging **Server Components** for performance.

---

## Getting Started

Follow these steps to run the project locally.

1.  **Clone the repository:**
    
2.  **Set up Environment Variables:**
    This app requires specific environment variables to run. 

    Create a file named **`.env`** in the root of the project and include the following variables:

    ```bash
    # .env file
    
    # Next.js Public Variable 
    NEXT_PUBLIC_BASE_URL= https://mentor-match.onrender.com/
    NEXT_PUBLIC_CLIENT_ID= "your OAuth 2.0 Client IDs"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= "your Cloudinary" 
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET= "your Cloudinary" 
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.