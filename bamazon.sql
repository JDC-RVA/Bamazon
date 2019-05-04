DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (1, "Game Of Thrones", "dvd", 69.99, 20),
	   (2, "Wilson Basketball", "sports", 59.99, 10),
	   (3, "Logitech Mouse", "electronics", 29.99, 20),
	   (4, "iPhone", "electronics", 999.99, 20),
	   (5, "Apple Watch", "electronic", 325.99, 12),
	   (6, "Levi Jeans", "apparel", 39.99, 10),
	   (7, "Ray-Ban Sunglasses", "accessories", 89.99, 15),
	   (8, "Macbook Pro", "electronics", 1999.99, 5),
	   (9, "Sunblock", "topicals", 7.99, 20),
	   (10, "Samsung Galaxy", "electronics", 499.99, 10)