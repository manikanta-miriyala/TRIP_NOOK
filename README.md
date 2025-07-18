# TripNook - Hotel Booking Platform

A full-featured travel accommodation marketplace platform that allows users to discover, list, and review unique stays around the world. This application provides a comprehensive system for managing property listings, user authentication, reviews, and location-based searches.

## 🌐 Live Website

**[Visit TripNook](https://trip-nook.onrender.com/listings)**

Explore the live deployment to experience all features in action!

## ✨ Features

- 🔐 **User Authentication**: Secure signup, login, and logout functionality
- 🔒 **Authorization**: Role-based access control for listing and review management
- 📝 **Listing Management**: Create, read, update, and delete property listings
- 🖼️ **Image Upload**: Cloud-based image storage for property listings
- 📍 **Location Services**: Geocoding and interactive maps for properties
- ⭐ **Review System**: Add, view, and delete reviews with ratings (1-5 stars)
- 🔍 **Category Filtering**: Browse listings by property type (mountains, arctic, farms, deserts, castles)
- 💬 **Flash Messages**: Informative feedback for user actions
- 📱 **Responsive Design**: User-friendly interface across devices
- 🔄 **Session Management**: Persistent user sessions with secure cookie handling

## 🛠️ Technologies Used

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool
- **Passport.js** - Authentication middleware
- **Multer** - File upload middleware
- **Cloudinary** - Cloud storage for images
- **MapBox API** - Geocoding and map services
- **JOI** - Data validation
- **Express-session** - Session management
- **Connect-flash** - Flash messages
- **Method-override** - HTTP method override
- **Connect-mongo** - MongoDB session store

### Frontend

- **EJS** - Templating engine
- **EJS-Mate** - Layout templating
- **Bootstrap** - CSS framework
- **JavaScript** - Client-side scripting
- **MapBox GL JS** - Interactive maps

## 📁 Project Structure

The application follows a clean MVC (Model-View-Controller) architecture:

```
MajorProject/
├── app.js                # Application entry point and configuration
├── middleware.js         # Custom middleware functions
├── schema.js             # Joi validation schemas
├── cloudConfig.js        # Cloudinary configuration
├── controllers/          # Route controllers
│   ├── listings.js       # Listing controllers
│   ├── reviews.js        # Review controllers
│   └── users.js          # User authentication controllers
├── models/               # Database models
│   ├── listing.js        # Listing model with relationship handling
│   ├── review.js         # Review model with validation
│   └── user.js           # User model with Passport integration
├── routes/               # Route definitions
│   ├── listing.js        # Listing routes
│   ├── review.js         # Review routes
│   └── user.js           # Authentication routes
├── public/               # Static assets
│   ├── css/              # Stylesheets
│   ├── js/               # Client-side JavaScript
│   └── images/           # Static images and icons
├── utils/                # Utility functions
│   ├── ExpressError.js   # Custom error handling class
│   └── wrapAsync.js      # Async error wrapper
└── views/                # EJS templates
    ├── layouts/          # Page layouts and templates
    ├── includes/         # Reusable view components
    ├── listings/         # Listing-related views
    ├── users/            # Authentication views
    └── error.ejs         # Error page
```

## 🗄️ Data Models

### User Model

```javascript
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  // username & password fields are added by passport-local-mongoose
});

userSchema.plugin(passportLocalMongoose);
```

The User model leverages passport-local-mongoose for:

- Secure password hashing and salting
- Username validation
- Authentication methods

### Listing Model

```javascript
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: ["mountains", "arctic", "farms", "deserts", "castles"],
  },
});
```

Key features:

- Image storage with URL and filename
- Relationship with reviews (one-to-many)
- Owner reference for authorization
- Geolocation data for mapping
- Category classification

### Review Model

```javascript
const reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
```

Features:

- Rating system (1-5 scale)
- Timestamp tracking
- Author reference for user attribution

## 🔐 Security Features

TripNook implements several security measures to protect user data:

- **Password Security**: Passwords are securely hashed using bcrypt via passport-local-mongoose
- **Authentication**: Complete session-based authentication system
- **Authorization Middleware**: Custom middleware functions protect routes based on authentication status and resource ownership
- **Input Validation**: Joi schema validation prevents malicious data submission
- **Session Protection**: Secure session configuration with httpOnly cookies and MongoDB store
- **Error Handling**: Custom error classes prevent information leakage
- **Cross-Site Request Forgery**: Protection via properly implemented forms and authentication
- **Data Validation**: Schema-level validation ensures data integrity

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Cloudinary account
- MapBox account

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/aurora-escapes.git
   cd aurora-escapes
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the necessary environment variables (see below)

4. Start the application:

   ```bash
   node app.js
   ```

5. Access the application:
   - Open your browser and navigate to: `http://localhost:8080`

## 🔑 Environment Variables

The following environment variables are required:

```
# Database
ATLASDB_URL=mongodb+srv://your_username:your_password@cluster0.mongodb.net/aurora-escapes

# Session
SECRET=your_session_secret_key

# Cloudinary
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MapBox
MAP_TOKEN=your_mapbox_access_token
```

## 📸 Image Handling

TripNook uses Cloudinary for efficient image storage and processing:

### Cloudinary Integration

- **Cloud Storage**: All listing images are stored in Cloudinary's cloud service
- **Image Optimization**: Automatic image resizing and optimization
- **Supported Formats**: PNG, JPG, and JPEG image formats
- **Storage Organization**: Images are stored in a dedicated "hotel_BOOKING" folder

### Implementation

Cloudinary configuration is managed in `cloudConfig.js`:

```javascript
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hotel_BOOKING",
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});
```

The upload process:

1. Images are submitted via forms with `enctype="multipart/form-data"`
2. Multer middleware processes the upload
3. Cloudinary storage adapter handles cloud transfer
4. The image URL and filename are stored in the listing document

## 🗺️ Map Integration

TripNook uses MapBox for interactive maps to display property locations:

### Map Features

- **Interactive Maps**: Dynamic, zoomable maps for each property listing
- **Custom Markers**: Red markers pinpoint the exact property location
- **Information Popups**: Click on markers to view property information
- **Privacy Protection**: Exact location details are only provided after booking

### Implementation

MapBox integration is implemented in the client-side JavaScript:

```javascript
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates,
  zoom: 9,
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4><p>Exact location will be provided after booking!</p>`
    )
  )
  .addTo(map);
```

### Geocoding Process

1. When creating a listing, the provided address is geocoded using MapBox API
2. The coordinates are stored in the listing's `geometry` field
3. These coordinates are used to display the property location on maps

## 🔄 API Endpoints

### Listings

| Method | Endpoint                   | Description              | Authentication   |
| ------ | -------------------------- | ------------------------ | ---------------- |
| GET    | /listings                  | List all accommodations  | None             |
| GET    | /listings/new              | Display new listing form | Required         |
| POST   | /listings                  | Create a new listing     | Required         |
| GET    | /listings/:id              | View a specific listing  | None             |
| GET    | /listings/:id/edit         | Edit listing form        | Required + Owner |
| PUT    | /listings/:id              | Update a listing         | Required + Owner |
| DELETE | /listings/:id              | Delete a listing         | Required + Owner |
| GET    | /listings/search/:category | Filter by category       | None             |

### Reviews

| Method | Endpoint                        | Description     | Authentication    |
| ------ | ------------------------------- | --------------- | ----------------- |
| POST   | /listings/:id/reviews           | Add a review    | Required          |
| DELETE | /listings/:id/reviews/:reviewId | Delete a review | Required + Author |

### Authentication

| Method | Endpoint | Description               | Authentication |
| ------ | -------- | ------------------------- | -------------- |
| GET    | /signup  | Display registration form | None           |
| POST   | /signup  | Register a new user       | None           |
| GET    | /login   | Display login form        | None           |
| POST   | /login   | Authenticate user         | None           |
| GET    | /logout  | Log out user              | Required       |

## ⚠️ Error Handling

The application includes a robust error handling system:

- **Custom Error Class**: `ExpressError` extends JavaScript's Error with status codes
- **Async Wrapper**: `wrapAsync` utility captures errors in async route handlers
- **Validation Middleware**: Pre-validates inputs before processing
- **Global Error Handler**: Centralized error processing middleware
- **404 Handling**: Custom handling for undefined routes
- **User-Friendly Messages**: Error information is displayed in a user-friendly format

## 🚀 Future Enhancements

Potential features for future development:

- User profile management and dashboard
- Advanced search with filtering (price, amenities, etc.)
- Booking system with calendar integration
- Payment processing
- Email notifications
- Social media authentication
- Admin dashboard for platform management
- Multilingual support
- Mobile application
- Performance optimizations
- Analytics and reporting

## 📝 License

This project is available for reference and educational purposes.

## 🙏 Acknowledgements

- TripNook was created as part of a web development learning journey
- Special thanks to all open-source libraries that made this project possible
- Thanks to MongoDB, Cloudinary, and MapBox for their excellent services and documentation
- Visit the live site at [https://trip-nook.onrender.com](https://trip-nook.onrender.com)

---

_Last updated: May 2025_
