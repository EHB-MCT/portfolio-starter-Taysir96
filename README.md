# Medialab Loan application API

## Purpose:
This Node.js API is designed as a borrowing system for schools or media labs. It enables students to borrow and reserve items, with loan creation restricted to administrators.

## API Endpoints:

### User Routes
- `POST /register`: Register a new user.
- `POST /login`: Log in a user.

### Item Routes
- `GET /items`: Retrieves all items.
- `POST /items`: Creates a new item.
- `GET /items/:id`: Retrieves a specific item by ID.
- `PUT /items/:id`: Updates a specific item by ID.
- `DELETE /items/:id`: Deletes a specific item by ID.

### Loan Routes
- `POST /create-loan`: Creates a new loan.
- `GET /get-loans`: Retrieves all loans with associated users and items.
- `GET /get-loan`: Retrieves a specific loan by loan ID.
- `DELETE /delete-loan`: Deletes a specific loan by loan ID.
- `PUT /update-loan`: Updates a specific loan by loan ID.

## Quick start:
1. Copy `.env.template` to a new `.env` file and configure it.
2. Run the project using Docker Compose:
   ```
   docker-compose up --build
   ```

## Development Status:
The project is currently in development. New features and updates are actively being added.

## Questions and Support:
For questions or support, open a ticket in the project's issue tracker.

## License:
This project is licensed under the MIT License - see the LICENSE file for details.