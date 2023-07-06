# IMS API (Identity Management System)
The IMS API is a system that manages user identities and access rights for projects. It allows users to
securely share their information with projects that request it, using a combination of a persnal IMS code and an OTP
(One-Time Password). Users can also edit their profile information, such as photos and files, and have full control
over their data

![IMS Logo](https://res.cloudinary.com/dtesbvsy0/image/upload/v1688582396/2KTteam_k6gjve.png)

## Features

- Manager registration: Create Manager accounts (seeded into the system).
- Admin registration: Create Admin accounts (by a Manager).
- User registration: Create User accounts (by an Admin).
- Authentication: Authenticate users based on their credentials.
- User profile management: Users can access and update their profile data, such as name, email, photos, and PDF documents.
- User identity verification: Verify user identities using email verification and OTP (One-Time Password) confirmation.
- Access control: Restrict access to certain resources based on user roles using appropriate privilege middlewares.
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
4. Open in a code editor
5. Configure the environment variables:
   - Create a `.env` file based on the `.env.example` file provided.
   - Copy all the variables from the `.env.example` file to the `.env` file
   - Update the environment variables with your specific configuration (e.g., MongoDB connection URL, API credentials).
6. Start the application: `npm run start` which uses node to run the application in production environment; or you can use `npm run dev` which uses nodemon to run the API server in development environment. they are both available from the `package.json` file.

### API Documentation

The API documentation provides detailed information about each endpoint, request parameters, and response formats. It's recommended to review the documentation to understand the available functionalities and how to interact with the API.

You can find the API documentation at [https://documenter.getpostman.com/view/19482223/2s93zFXKJe](https://documenter.getpostman.com/view/19482223/2s93zFXKJe).

[This API is also hosted live on render server here. Click me!](https://hackerthon2023.onrender.com)

### Usage

Once the IMS API is up and running, you can start making requests to the API endpoints using your preferred method (e.g., curl, Postman). Ensure that you include the required headers, request parameters, and payload as specified in the API documentation.

Here's an example of a request to register a new Admin:

POST /api/v1/auth/register/admin
Content-Type: application/json
access_token: bearer token of a Manager
```
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
```
Find the full API documentation at [https://documenter.getpostman.com/view/19482223/2s93zFXKJe](https://documenter.getpostman.com/view/19482223/2s93zFXKJe).

## Contributing

Contributions to the IMS API are welcome! If you have any suggestions, bug reports, or feature requests, please submit them as issues or create a pull request with your proposed changes.

## Acknowledgments

We would like to acknowledge and express our heartfelt appreciation to the dedicated team members, the 2KTteam who contributed to the development and success of this project:

- [Afudoh Kachi Douglas](https://github.com/fudosman) Your coding skills contributed to the accelerated development of the project.
- [Toby Chidi](https://github.com/tobychidi) Your quality assurance skill, ensured that we were upholding all the 10 laws of rest and all the best practices of clean code.
- [Kenechukwu Josaih](https://github.com/kenechukwuJosiah) for your amazing ideas that accelarated our development speed.

We are grateful to the Trebble team for an opportunity to participate in this hackerthon. we deeply appreciate the effort that has gone into making the hackathon and it has been a social outlet of the 2KTteam.

## Contact

If you have any questions, feedback, or inquiries, please contact any of us on our github accounts where our profiles and contact information are available.
