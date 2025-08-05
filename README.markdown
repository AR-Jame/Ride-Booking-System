# RIDE BOOKING APP
A ride booking platform that connects passengers with available drivers in real time. This system enables users to request rides, track ride status, and complete bookings efficiently—similar to apps like Uber or Pathao.



<!-- ## 📝 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints) -->

## ✨ Features
- **User Registration/Login**: Secure authentication for passengers and drivers.
- **Ride Booking**: Book rides with destination and pickup location inputs.
- **Ride status tracking**: Tracking the ride in every stage and complete log
- **Fare Estimation**: View estimated ride costs before booking.
- **Driver Ratings**: Rate drivers based on ride experience.
- **GEO Location based filtering**: GEO location based filtering for driver and ride.

## 🛠️ Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Maps**: GRAPH HOPPER
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel

## 🌐 Live API

🔗 **Production URL**:
[https://ride-booking-system-five.vercel.app](https://ride-booking-system-five.vercel.app)

---

## 🧷 API Endpoints
Here are some key API endpoints (base URL: `http://localhost:5000/api/v1`):

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/login` | Authenticate user and issue JWT token |
| GET | `/auth/access-token` | Generate a new access token |

### User Management

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/user/create` | Register a new user |
| GET | `/user` | Fetch all users |
| GET | `/user/me` | Retrieve authenticated user's profile |
| PATCH | `/user/update-user/:userId` | Update user details by user ID |

### Ride Management

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/ride/create` | Create a new ride request |
| GET | `/ride` | Fetch all rides |
| GET | `/ride/current-ride` | Get the user's current active ride |
| GET | `/ride/my-rides` | Retrieve user's ride history |
| GET | `/ride/ride-details/:rideId` | Get details for a specific ride |
| GET | `/ride/my-earning` | Fetch driver's daily/monthly earnings |
| GET | `/ride/accept-ride/:rideId` | Driver accepts a ride by ID |
| GET | `/ride/cancel-ride/:rideId` | Cancel a ride by ID |
| GET | `/ride/nearby-rides` | Fetch nearby rides based on geolocation |
| PATCH | `/ride/update-ride-status/:rideId` | Update ride status with detailed logging |

### Driver Management

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/driver/create` | Submit request to become a driver |
| POST | `/driver/nearest-driver` | Find nearby drivers using geolocation |
| GET | `/driver` | Fetch all drivers with user info |
| GET | `/driver/me` | Retrieve authenticated driver's profile |
| PATCH | `/driver/update-status/:userId` | Admin updates driver status (ACCEPTED/SUSPEND) |
| PATCH | `/driver/update-availability` | Set driver's online/offline status |
| PATCH | `/driver/update-rating/:driverId` | Passenger submits rating for a driver |



---

## 📁 Project Structure

```
src/
├── config/            # ALl kind of config
├── routes/            # API definition
├── modules/           # All feature and modules
├── Error helpers/     # Zod schema validations
├── utils/             # Utility functions
└── server.ts          # Entry point
```