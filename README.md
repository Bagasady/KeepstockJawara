# KeepStock Jawara Inventory System

## Deployment Guide for cPanel Hosting

### Prerequisites
- cPanel hosting account with:
  - Node.js support (version 18 or higher)
  - MySQL database
  - PHP 8.0 or higher
- Domain or subdomain where you want to deploy
- FTP access credentials

### Step 1: Database Setup

1. Log in to your cPanel account
2. Navigate to "MySQL Databases"
3. Create a new database:
   - Database name: `keepstock_db`
   - Create a new user with a strong password
   - Assign all privileges to the user

4. Import the initial database structure:
   ```sql
   -- Create products table
   CREATE TABLE products (
     sku VARCHAR(20) PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     rack VARCHAR(20) NOT NULL,
     department VARCHAR(50) NOT NULL
   );

   -- Create stock_items table
   CREATE TABLE stock_items (
     id VARCHAR(36) PRIMARY KEY,
     sku VARCHAR(20) NOT NULL,
     quantity INT NOT NULL,
     box_number VARCHAR(20) NOT NULL,
     timestamp DATETIME NOT NULL,
     store_name VARCHAR(50) NOT NULL,
     FOREIGN KEY (sku) REFERENCES products(sku)
   );

   -- Create refill_items table
   CREATE TABLE refill_items (
     id VARCHAR(36) PRIMARY KEY,
     box_number VARCHAR(20) NOT NULL,
     quantity INT NOT NULL,
     timestamp DATETIME NOT NULL,
     store_name VARCHAR(50) NOT NULL
   );

   -- Create stores table
   CREATE TABLE stores (
     code VARCHAR(10) PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     total_stock INT NOT NULL DEFAULT 0
   );

   -- Create users table
   CREATE TABLE users (
     username VARCHAR(50) PRIMARY KEY,
     password VARCHAR(255) NOT NULL,
     store VARCHAR(50) NOT NULL
   );
   ```

### Step 2: Project Setup

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Upload files to cPanel:
   - Using FTP, upload the contents of the `dist` folder to `public_html` or your desired subdirectory
   - Create a new directory called `server` in your hosting root
   - Upload the following server files to the `server` directory:
     - `src/data/mockData.ts` (modified for database connection)
     - `.env` (with database credentials)

3. Modify the database connection in `mockData.ts`:
   ```typescript
   import mysql from 'mysql2/promise';

   const pool = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0
   });

   // Replace mock data with database queries
   export const getProducts = async (): Promise<Product[]> => {
     const [rows] = await pool.query('SELECT * FROM products');
     return rows as Product[];
   };

   export const getStockItems = async (): Promise<StockItem[]> => {
     const [rows] = await pool.query('SELECT * FROM stock_items');
     return rows as StockItem[];
   };

   // Add similar functions for other data operations
   ```

4. Create `.env` file in the server directory:
   ```
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=keepstock_db
   ```

### Step 3: Configure cPanel

1. Set up Node.js:
   - Go to "Setup Node.js App" in cPanel
   - Create a new application
   - Set the application path to your server directory
   - Set the application URL
   - Set Node.js version to 18.x
   - Set NPM version to 9.x
   - Enable application startup after setup

2. Configure environment:
   - In cPanel, go to "Software > MultiPHP INI Editor"
   - Set memory_limit to at least "256M"
   - Set max_execution_time to "300"
   - Set upload_max_filesize to "64M"

3. Set up SSL (recommended):
   - Go to "Security > SSL/TLS"
   - Install SSL certificate for your domain
   - Enable "Force HTTPS" redirection

### Step 4: Final Configuration

1. Update the frontend API endpoints:
   - Modify the API base URL in your production build to point to your server
   - Update CORS settings if necessary

2. Test the deployment:
   - Visit your domain/subdomain
   - Verify all features are working
   - Check database connections
   - Test user authentication

### Troubleshooting

Common issues and solutions:

1. Database Connection Errors:
   - Verify database credentials in `.env`
   - Check database user permissions
   - Ensure proper table structure

2. 500 Internal Server Error:
   - Check Node.js application logs
   - Verify file permissions
   - Check PHP error logs

3. White Screen / Blank Page:
   - Enable error reporting in PHP
   - Check browser console for JavaScript errors
   - Verify all static assets are properly loaded

### Security Considerations

1. Always use HTTPS
2. Implement proper authentication
3. Use environment variables for sensitive data
4. Regular database backups
5. Keep Node.js and npm packages updated

### Maintenance

1. Regular backups:
   - Database
   - Application files
   - Environment configurations

2. Monitoring:
   - Set up server monitoring
   - Configure error logging
   - Monitor database performance

3. Updates:
   - Keep Node.js version current
   - Update npm packages regularly
   - Monitor security advisories

For additional support or questions, please contact the development team.