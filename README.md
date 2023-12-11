# GymPass App

Welcome to the GymPass-style app! This project allows users to sign up, authenticate, manage their profile, view check-in history, search for nearby gyms, and check in seamlessly.

## Functional Requirements

### Sign up
- Users can sign up by providing their name, email, password, and date of birth.

### Authentication
- Users can authenticate by providing their email and password.

### Profile
- Users can retrieve their profile, including name, email, number of check-ins, and check-in history.

### Check-in History
- Users can view their check-in history, detailing date, time, and location.

### Search for Nearby Gyms
- Users can search for gyms near their current location.

### Search by Gym Name
- Users can search for gyms by name.

### Check in to a Gym
- Users can check in to a gym.

### Check-in Validation
- Administrators can validate a user's check-in.

### Gym Registration
- Administrators can register a gym.

## Business Rules

- Users cannot sign up with a duplicate email.
- Users cannot make more than one check-in on the same day.
- Users can only check in if they are within 100 meters of the gym.
- Check-ins can only be validated within 20 minutes of creation.
- Check-ins can only be validated by administrators.
- Gyms can only be registered by administrators.

## Non-functional Requirements

- User passwords are encrypted before storage.
- Application data is persisted in a PostgreSQL database.
- All data lists are paginated with 20 items per page.
- Users are identified by a JWT.

## Technologies Used

- **Backend:** Node.js, Fastify, PostgreSQL

## Project Status

The project is currently under development. The listed functional requirements are actively being implemented.

## How to Contribute

1. **Clone the repository:**
   ```
   https://github.com/ndelanhese/ignite-api-restful-solid.git
   ```

2. **Enter the project folder:**
   ```
   cd app-gympass
   ```

3. **Install the dependencies:**
   ```
   pnpm i
   ```

4. **Start the development server:**
   ```
   pnpm dev
   ```

   The development server will be accessible at http://localhost:3000.

To contribute to non-functional requirements, open an issue in the repository.

Your contributions are highly appreciated! Happy coding!