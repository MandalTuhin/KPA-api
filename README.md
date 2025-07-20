# KPA Forms API Backend Assignment

This repository contains the backend API implementation for the KPA Forms assignment. The project is built with Node.js and Express.js, demonstrating a robust, well-structured, and secure API architecture.

## Implemented APIs

As per the assignment requirements, the following two APIs have been fully implemented:

1.  **Create Wheel Specification Form**

    - **Method:** `POST`
    - **Endpoint:** `/api/forms/wheel-specifications`
    - **Description:** Accepts a JSON payload to create a new wheel specification record in the PostgreSQL database. Includes comprehensive, schema-based validation for all incoming data.

2.  **Get Wheel Specification Forms**
    - **Method:** `GET`
    - **Endpoint:** `/api/forms/wheel-specifications`
    - **Description:** Retrieves a list of wheel specification records. Supports filtering via query parameters (`formNumber`, `submittedBy`, `submittedDate`), which are also validated to ensure data integrity and security.

---

## Technology Stack

- **Framework:** Node.js / Express.js
- **Database:** PostgreSQL
- **Validation:** Zod
- **Language:** JavaScript (ES Modules)
- **Environment Variables:** `dotenv`

## Framework Choice

While the assignment mentioned a preference for Python frameworks, I chose to build the API using Node.js and Express.js to best demonstrate my proficiency in building robust, well-structured, and secure APIs. My goal was to showcase my ability to apply core software engineering principles effectively, regardless of the specific language or framework.

This project highlights my skills in:

- **Modular Architecture:** Separating concerns into distinct routes, controllers, validation schemas, and middleware.
- **Asynchronous Programming:** Effectively using `async/await` for non-blocking database operations.
- **Middleware Implementation:** Creating a reusable, generic validation middleware for both request bodies (`POST`) and query parameters (`GET`).
- **Schema-Based Validation:** Leveraging `zod` to enforce strict data integrity and provide detailed error feedback.
- **Secure Database Interaction:** Using parameterized queries to prevent SQL injection vulnerabilities.

I am confident in my ability to quickly adapt to any technology stack, including Python/FastAPI, as the fundamental principles of API design, database management, and security are universal.

---

## Key Features & Best Practices

This project goes beyond the basic requirements to include several features that demonstrate a commitment to high-quality code.

- **✅ Robust Input Validation (Bonus Point):**

  - Used **Zod** for powerful, schema-based validation.
  - Validation is applied to both `POST` request bodies and `GET` query parameters.
  - Implemented advanced sequential validation for `submittedDate` to first check the format and then ensure the date is not in the future.

- **✅ Environment-Based Configuration (Bonus Point):**

  - All sensitive information (database credentials, port) is managed through a `.env` file, keeping it separate from the codebase.

- **Secure by Design:**

  - All database queries are fully parameterized to prevent any risk of SQL injection.

- **Clean, Modular Architecture:**
  - **`routes/`**: Define API endpoints and connect them to middleware and controllers.
  - **`controllers/`**: Contain the core business logic for each endpoint.
  - **`schemas/`**: Centralize data validation rules for reusability and clarity.
  - **`middleware/`**: House reusable logic, such as the generic validation middleware.

---

## Project Setup and Installation

Follow these steps to set up and run the project locally.

### 1. Prerequisites

- Node.js (v18 or later)
- pnpm (or npm/yarn)
- PostgreSQL

### 2. Clone the Repository

```bash
git clone https://github.com/MandalTuhin/KPA-api.git
cd KPA-api
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root of the project and add your PostgreSQL database credentials. You can use the `.env.example` file as a template.

```ini
# .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_database_name
PORT=4000
```

### 5. Set Up the Database

Connect to your PostgreSQL instance and run the following SQL command to create the necessary table:

```sql
CREATE TABLE wheel_specifications (
    id SERIAL PRIMARY KEY,
    form_number VARCHAR(255) NOT NULL UNIQUE,
    submitted_by VARCHAR(255) NOT NULL,
    submitted_date DATE NOT NULL,
    fields JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## Testing with Postman

A complete Postman collection is included in the root of this repository: `KPA-Forms-API-Tuhin-Mandal.postman_collection.json`.

You can import this collection into Postman to test all the implemented endpoints. It includes example requests and saved responses for both success and error cases. The collection is configured to use a `{{baseURL}}` variable, which is preset to `http://localhost:4000`.

---

## Running the Application

To start the development server with hot-reloading (thanks to `nodemon`), run:

```bash
pnpm start
```

The API will be available at `http://localhost:4000`.
