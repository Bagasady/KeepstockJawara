# KeepStock Jawara Inventory System

## Deployment Guide for cPanel with Git Version Control

### Prerequisites
- cPanel hosting account with:
  - Git Version Control feature enabled
  - Node.js support (version 18 or higher)
  - MySQL database
  - PHP 8.0 or higher
- Domain or subdomain where you want to deploy
- Git installed on your local machine

### Step 1: Database Setup

1. Log in to your cPanel account
2. Navigate to "MySQL Databases"
3. Create a new database:
   - Database name: `keepstock_db`
   - Create a new user with a strong password
   - Assign all privileges to the user

4. Import the initial database structure using phpMyAdmin or MySQL command line.

### Step 2: Set Up Git Version Control in cPanel

1. Log in to cPanel
2. Navigate to "Git™ Version Control"
3. Click "Create" to set up a new Git repository
4. Fill in the repository details:
   - Clone URL: Your repository URL
   - Repository path: `public_html/keepstock` (or your preferred directory)
   - Repository name: `keepstock`
5. Click "Create" to create the repository

### Step 3: Configure Local Repository

1. Initialize Git in your local project (if not already done):
   ```bash
   git init
   ```

2. Create .gitignore file:
   ```
   node_modules/
   .env
   .DS_Store
   ```

3. Add cPanel repository as remote:
   ```bash
   git remote add cpanel ssh://username@your-domain.com:2222/home/username/repositories/keepstock
   ```

4. Add and commit your files:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

### Step 4: Deploy to cPanel

1. Push your code to cPanel:
   ```bash
   git push cpanel master
   ```

2. In cPanel, go to "Git™ Version Control"
3. Click "Manage" next to your repository
4. Click "Pull or Deploy"
5. Click "Update from Remote" to pull changes
6. Click "Deploy HEAD Commit" to deploy

### Step 5: Post-Deployment Setup

1. SSH into your server or use cPanel Terminal
2. Navigate to your project directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Set up environment variables in cPanel:
   - Create a `.env` file in your project root
   - Add necessary environment variables:
   ```
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=keepstock_db
   ```

### Automatic Deployment

To set up automatic deployment:

1. In cPanel Git Version Control:
   - Click "Manage" for your repository
   - Enable "Automatic Deployment"
   - Set branch to deploy (usually 'master' or 'main')

2. Add post-receive hook:
   ```bash
   #!/bin/bash
   cd /home/username/public_html/keepstock
   npm install
   npm run build
   ```

### Security Considerations

1. Use SSH keys for Git authentication
2. Keep your .env file out of version control
3. Use HTTPS for your domain
4. Regularly update dependencies
5. Back up your database regularly

### Troubleshooting

Common issues and solutions:

1. Git Push Errors:
   - Verify SSH credentials
   - Check repository permissions
   - Ensure correct remote URL

2. Build Errors:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check build logs

3. Database Connection Issues:
   - Verify database credentials
   - Check database user permissions
   - Ensure proper table structure

### Maintenance

1. Regular Updates:
   ```bash
   git pull origin master
   npm install
   npm run build
   git push cpanel master
   ```

2. Monitor:
   - Server resources
   - Database performance
   - Error logs

3. Backup:
   - Database backups
   - Regular code commits
   - Environment configurations

For additional support or questions, please contact the development team.