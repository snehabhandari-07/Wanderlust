# Wanderlust - A Travel Listing Web App

Wanderlust is a full-stack web application inspired by Airbnb, built using the MERN stack. It allows users to create, browse, review, and manage travel listings with authentication and cloud-based image uploads.

Live Demo: [https://wanderlust-mern-project-ueft.onrender.com](https://wanderlust-mern-project-ueft.onrender.com)

---

## Features

- User authentication and authorization (register, login, logout)
- Full CRUD functionality for travel listings
- Create, edit, and delete reviews for listings
- Flash messages for user feedback
- Centralized error handling and server-side validation
- Secure image uploading and cloud storage
- Session handling with persistent login
- Deployed on Render with MongoDB Atlas

---

## Tech Stack

**Frontend:**
- EJS templating engine
- HTML5, CSS3
- Bootstrap (UI styling)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- MongoDB Atlas (cloud-hosted MongoDB database)
- Passport.js for authentication
- Multer for handling file uploads
- Cloudinary for storing images
- Express-session and Connect-mongo
- dotenv for environment configuration
  

---

## Authentication and Authorization

- Authentication is implemented using Passport.js with local strategy.
- Authorization ensures that only listing owners can modify or delete their own listings or reviews.
- User sessions are stored using Connect-mongo with session expiration and security configured.

---

## Image Uploading

- Users can upload images when creating or editing listings.
- Multer handles `multipart/form-data` for file uploads.
- Uploaded images are stored in Cloudinary.
- Multiple images are supported per listing.

---

## Getting Started (Local Development)

Follow these steps to run Wanderlust on your local machine:

1. **Clone the repository**
   
   - git clone https://github.com/snehabhandari-07/Wanderlust
   - cd wanderlust

2. **Install dependencies**

   npm install

3. **Create a .env file in the root directory with the following content:**
   
    - ATLASDB_URL=your_mongodb_atlas_url
    - SECRET=your_cookie_secret
    - CLOUDINARY_CLOUD_NAME=your_cloud_name
    - CLOUDINARY_KEY=your_api_key
    - CLOUDINARY_SECRET=your_api_secret
    - NODE_ENV=development

4. **(Required) Initialize the database with data**

5. **Start the server**
   - npm start
   
6. **Open your browser and visit**
   http://localhost:5000

---
## Future Enchancements
- Add interactive maps for listings using Mapbox or Leaflet
- Implement full-text search and filtering options

---
By **Sneha**
- GitHub: https://github.com/snehabhandari-07
- LinkedIn: www.linkedin.com/in/sneha-bhandari-478953250




