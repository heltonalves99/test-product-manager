# Test Product Manager

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Available Commands](#available-commands)
- [Roadmap](#roadmap)
- [License](#license)

## Description

Develop a web application for managing products and orders. The application consists of two main directories:

- `api`: An API developed with NestJS, Prisma, and PostgreSQL, following SOLID principles.
- `web`: A Next.js application for the user interface.

The API handles business logic and database access, while the web application provides a user-friendly interface for users to interact with the system.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Make](https://www.gnu.org/software/make/)
- [Docker Compose](https://docs.docker.com/compose/install/) (if not included with Docker Desktop)

## Environment Setup

### Clone the Repository

```bash
git clone https://github.com/heltonalves99/test-product-manager.git
cd test-product-manager
```

## API Environment

The `api` directory contains the backend code for the application. It is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. The API follows the SOLID principles to ensure maintainability and scalability. Prisma is used as the ORM to interact with the PostgreSQL database, providing a type-safe database client. The API is responsible for handling all business logic, data validation, and database operations. It exposes RESTful endpoints for the web application to consume and perform various operations related to products and orders.

- `POST /products`: Creates a new product.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "category": "string",  // Must be one of: ELECTRONICS, CLOTHING, FOOD, BOOKS, OTHERS
      "description": "string",
      "price": "number",
      "stockQuantity": "number"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "description": "string",
      "price": "number",
      "stockQuantity": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

- `GET /products/:id`: Retrieves a product by its ID.
  - **Response**:
    ```json
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "description": "string",
      "price": "number",
      "stockQuantity": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

- `GET /products`: Lists all products.
  - **Response**:
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "category": "string",
        "description": "string",
        "price": "number",
        "stockQuantity": "number",
        "createdAt": "string",
        "updatedAt": "string"
      },
      ...
    ]

- `PUT /products/:id`: Updates an existing product.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "price": "number",
    }
    ```
  - **Response**:
    ```json
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "description": "string",
      "price": "number",
      "stockQuantity": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

### 1. Configure Environment Variables

Copy the example environment variables file and edit it with your local configurations. The .env.local file is used to store environment variables specific to your local development environment.

```bash
cp .env.local.example .env.local
```

Edit the `.env.local` file with your specific settings.

### 2. Build and Run the Project

To build and run the project for the first time, use the following commands:

#### Build the Containers and Install Dependencies

```bash
make build
```

#### Start the Database and Application

```bash
make up
```

#### Generate Prisma Client

```bash
make prisma-generate
```

## Usage

After setting up the environment and seeding the database with mock posts, you can access the application by navigating to http://localhost:3000 in your web browser. The home page will display a list of blog posts.

## Available Commands

- `make build`: Create the containers and install all dependencies for the app and database.
- `make up`: Start the database and the application using Docker.
- `make prisma-generate`: Generate the Prisma client to ensure it is always up to date with the database schema.
- `make test`: Run unit tests.

## Roadmap

### API
- [ ] Implement Edit product endpoint
- [ ] Implement Delete product endpoint
- [ ] Create Order feature to manage the order of products
- [ ] Increase test coverage to 90% with unit and integration tests
- [ ] Create a production-ready Docker image with multi-stage builds and optimized configurations
- [ ] Set up a CI/CD pipeline with GitHub Actions for automated builds, testing, and deployments
- [ ] Deploy the application to Vercel with automatic deployments on push to the main branch

### WEB
- [ ] Design and implement the user interface using Next.js
- [ ] Integrate the web application with the API endpoints
- [ ] Implement user authentication and authorization
- [ ] Create responsive and accessible UI components
- [ ] Set up client-side routing and state management
- [ ] Write unit and integration tests for the web application
- [ ] Optimize the web application for performance and SEO

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
