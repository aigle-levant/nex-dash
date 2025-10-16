# End-to-End Customer Onboarding Workflow MVP

This repository contains the take-home assignment: a Minimum Viable Product (MVP) for a customer onboarding workflow designed for customs brokers for the company, Nex-Improve, done by @aigle-levant.

The system allows brokers to register exporters/importers, save their details, and view them on a dashboard.

## Architecture

### Frontend

- **Framework**: React with Vite and TSX for a type-safe, efficient single-page application.
- **Components**:
  - Login/Register: Broker authentication with name, email, GSTIN. Protected by bcrypt and other security tools.
  - Dashboard: Displays customer count, recent customers, and status breakdown.
- **Routing**: React Router manages navigation between login, register, and dashboard pages.
- **Development Server**: Runs on `localhost:5173` with proxy to backend API.

### Backend

- **Framework**: Node.js with Express for RESTful API services.
- **Endpoints**:
  - `POST /customers`: Saves customer data to PostgreSQL.
  - `GET /customers`: Fetches customers for the logged-in broker.

- **Database**: PostgreSQL hosted on Neon.tech, with a `customers` table storing `id`, `broker_id`, `name`, `email`, `gstin`, `created_at`, `status`, and `updated_at`.
- **Server**: Runs on `localhost:8000`, with `pg` library for database connectivity.

### Data Flow

- Brokers log in, navigate to the registration form, submit customer details, and view them on the dashboard. Data is persisted in PostgreSQL and retrieved via API calls. If admin, they can view the customers of all the registered brokers.

### Demo

- For demo trial, use the credentials provided as is in the documentation.

## Security

- **Authentication**: Implemented using a custom auth system with bcrypt for password hashing. Login checks credentials against the `users` table (assumed to contain brokers).
- **Data Validation**: Frontend validates Name, Email, and GSTIN formats; backend ensures uniqueness of `email` and `gstin`.
- **CORS**: Configured to allow requests from the frontend (Vite proxy).

## Setup Instructions

1. Clone the Repository:
```bash
git clone https://github.com/your-username/repo-name.git
```

2. Install Dependencies:

Frontend: ``cd frontend; npm install``
Backend: ``cd backend; npm install``

3. Configure Environment:

Create a .env file in the backend folder with your Neon.tech connection string (e.g., DATABASE_URL=your_connection_string). Also don't forget to generate JWT keys.

4. Run the Application:

Backend: ``cd backend; npm start``
Frontend: ``cd frontend; npm run dev``

5. Access:

Open http://localhost:5173 in your browser.
