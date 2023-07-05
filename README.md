# IMS API (Identity Management System)

IMS API is an identity management system that provides a seamless way to verify users and manage their identities. It offers a set of endpoints that allow you to identify and confirm the identity of a user.

## Features

- Manager registration: Create Manager accounts (seeded into the system).
- Admin registration: Create Admin accounts (by a Manager)
- User registration: Create User accounts (by an Admin)

- authentication: Authenticate users based on their credentials.
- User profile management: Users can update their profile data, such as name, email photos and pdf documents.
- User identity verification: Verify user identities using various methods, such as email verification and the use of OTP (One-Time Password) verification.
- access control: restrict access to certain resources based on user roles using appropriate privillege middlewares.
- User activity logging: Track and log user activities for auditing purposes.

## Getting Started

These instructions will guide you on how to set up and utilize the IMS API in your own applications. 

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- MongoDB installed and running.
- API credentials: check the `.env.example` file for more information about the environment variables needed for the IMS API configuration

### Installation

1. Clone the repository: `git clone https://github.com/2KTTeam/IMS.git`
2. Navigate to the project directory: `cd IMS`
3. Install the dependencies: `npm install`
4. Configure the environment variables:
   - Create a `.env` file based on the `.env.example` file provided.
   - Update the environment variables with your specific configuration (e.g., MongoDB connection URL, API credentials).
5. Start the application: `npm run start` which uses node to run the application in production environment; or you can use `npm run dev` which uses nodemon to run the API server in development environment. they are both available from the `package.json` file.

### API Documentation

The API documentation provides detailed information about each endpoint, request parameters, and response formats. It's recommended to review the documentation to understand the available functionalities and how to interact with the API.

You can find the API documentation at [https://documenter.getpostman.com/view/19482223/2s93zB51bY](https://documenter.getpostman.com/view/19482223/2s93zB51bY).

### Usage

Once the IMS API is up and running, you can start making requests to the API endpoints using your preferred method (e.g., curl, Postman). Ensure that you include the required headers, request parameters, and payload as specified in the API documentation.

Here's an example of a request to register a new Admin:

POST /api/v1/auth/register/admin
Content-Type: application/json
access_token: bearer token of a Manager

{
    "firstname": "Trebble",
    "lastname": "Admin",
    "email": "kenneth@gmail.com",
    "password": "Manager123!",
    "role": "admin",
    "gender": "male",
    "dateOfBirth": "1994-02-17",
    "phoneNumber": "07067572151",
    "address": {
        "state": "Anambra",
        "country": "Nigeria"
    }
}

Find the full API documentation at [https://documenter.getpostman.com/view/19482223/2s93zB51bY](https://documenter.getpostman.com/view/19482223/2s93zB51bY).


### Security Considerations

When integrating the IMS API into your application, it's essential to follow security best practices to protect user data and prevent unauthorized access. Consider the following:

- Use secure connections (HTTPS) for all API requests to protect data in transit.
- Implement user authentication and authorization to ensure only authorized users can access protected resources.
- Enforce strong password policies and securely store passwords using hashing and salting techniques.
- Regularly update and patch dependencies used by the API to mitigate security vulnerabilities.
- Monitor and log user activities to detect and respond to any suspicious or unauthorized activities.

## Contributing

Contributions to the IMS API are welcome! If you have any suggestions, bug reports, or feature requests, please submit them as issues or create a pull request with your proposed changes.

## Acknowledgments

- [List any acknowledgments or credits to individuals or organizations whose work or contributions were used in the project.]

## Contact

If you have any questions, feedback, or inquiries, please contact our support team at afudohkachi@gmail.com.

---