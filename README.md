# CRUDApp Backend

Backend server for a CRUD application that manages users. It is built with Node.js, uses Express for routing, and PostgreSQL as the database. The project follows the MVC architecture to ensure maintainability and scalability.

## Features
- **User Authentication**: Secure login with hashed passwords using bcrypt.
- **CRUD Operations**: Fully implemented Create, Read, Update functionalities for user management.
- **Middleware**: Uses CORS and Helmet for enhanced security.
- **MVC Architecture**: Clear separation between models, controllers, and routes.
- **Database**: PostgreSQL with custom SQL scripts for data manipulation.

## Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
- **PostgreSQL**: Set up a PostgreSQL database and update the environment variables accordingly.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ivoryredgrave/crudapp-backend.git
   cd crudapp-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Load the SQL file into PostgreSQL:
   - Use a tool like pgAdmin or the `psql` command-line utility to execute the `src/database/crudapp.sql` script and set up the database.

4. Configure environment variables in `src/config/env.config.js`:

5. Start the development server:
   ```bash
   npm run dev
   ```
