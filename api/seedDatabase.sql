CREATE TABLE IF NOT EXISTS "Product" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL,
    stockQuantity INTEGER NOT NULL
);

INSERT INTO "Product" (name, category, description, price, stockQuantity) VALUES
('Laptop', 'Electronics', 'High-performance laptop', 1200.00, 10),
('T-Shirt', 'Clothing', 'Cotton t-shirt', 25.99, 50),
('Cookbook', 'Books', 'Italian cuisine cookbook', 35.50, 20),
('Smartphone', 'Electronics', 'Latest smartphone model', 800.00, 15),
('Jeans', 'Clothing', 'Denim jeans', 49.99, 30),
('Mystery Novel', 'Books', 'Thrilling mystery novel', 20.00, 25),
('Tablet', 'Electronics', 'Portable tablet device', 300.00, 25),
('Dress', 'Clothing', 'Summer dress', 59.99, 40),
('Science Fiction', 'Books', 'Classic science fiction novel', 18.00, 30),
('Headphones', 'Electronics', 'Noise-canceling headphones', 150.00, 20);
