-- Create Category table
CREATE TABLE IF NOT EXISTS "Category" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "parentId" INTEGER,
    FOREIGN KEY ("parentId") REFERENCES "Category"(id) ON DELETE SET NULL
);

-- Create Product table
CREATE TABLE IF NOT EXISTS "Product" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    FOREIGN KEY ("categoryId") REFERENCES "Category"(id) ON DELETE CASCADE
);

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

-- Create indexes for better performance
CREATE INDEX idx_category_parent_id ON "Category"("parentId");
CREATE INDEX idx_product_category_id ON "Product"("categoryId");
CREATE INDEX idx_user_email ON "User"(email);