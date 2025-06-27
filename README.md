# HobbyHood Server

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [License](#license)

---

## Features

- Create, retrieve, update, and delete hobbies and user-specific groups.
- User authentication based on email for managing personal groups.
- Connects to MongoDB Atlas with environment variables.
- CORS enabled and JSON parsing middleware included.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- dotenv
- cors

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas cluster set up

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Sumyta-Bentey-Habib/Hobby-Hood-Server.git
cd hobbyhood-server-site

## Environment Variables

| Variable     | Value                    | Description                    |
|--------------|--------------------------|-------------------------------|
| `DB_USERS`   | `sumytabenteyhabib`      | MongoDB Atlas username        |
| `DB_PASSWORD`| `D1WDJH98zveaGLXV`       | MongoDB Atlas password        |
| `PORT`       | `3000`                   | Port number for the server    |

---

## API Endpoints

### Hobby Endpoints

| Method | Endpoint   | Description                         | Parameters / Body                         |
|--------|------------|-------------------------------------|------------------------------------------|
| POST   | `/hobbies` | Add a new hobby                     | JSON body with hobby details              |
| GET    | `/hobbies` | Get all hobbies or filter by user  | Optional query param: `userEmail`         |

### My Groups Endpoints

| Method | Endpoint           | Description                                  | Parameters / Body                                      |
|--------|--------------------|----------------------------------------------|-------------------------------------------------------|
| POST   | `/my-groups`       | Add a hobby to "My Groups"                   | JSON body: `{ _id: hobbyId, userEmail, ...otherData }`|
| GET    | `/my-groups`       | Get all groups for a user                     | Query param: `userEmail` (required)                    |
| DELETE | `/my-groups/:id`   | Delete a group by its unique ID               | URL param: `id` (group _id), query param: `userEmail` |
| PUT    | `/my-groups/:id`   | Update a group by its unique ID               | URL param: `id`, query param: `userEmail`, JSON body with update fields |

### Other Endpoints

| Method | Endpoint     | Description            |
|--------|--------------|------------------------|
| GET    | `/all-groups`| Get all groups         |
| GET    | `/`          | Server status check    |

---

## Usage Examples

...

## License

...
