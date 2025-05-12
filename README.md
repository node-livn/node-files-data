# Node.js File Management System

A robust file management system built with Node.js, Express, and Prisma, featuring user authentication, admin controls, and file operations.

## Features

- 🔐 User Authentication System
- 👤 User Profile Management
- 📁 File Upload and Management
- 👨‍💼 Admin Dashboard
- 🔒 Secure Session Management
- 🎨 EJS Templating Engine
- 🗄️ Prisma Database Integration

## Tech Stack

- **Backend Framework:** Express.js
- **Database ORM:** Prisma
- **Template Engine:** EJS
- **Authentication:** Express Session
- **Password Hashing:** bcryptjs
- **Development:** Nodemon

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (or your preferred database)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd node-files-data
```

2. Install dependencies:
```bash
cd lab6
npm install
```

3. Set up your database:
```bash
npx prisma generate
npx prisma db push
```

4. Create a `.env` file in the root directory and add your environment variables:
```env
DATABASE_URL="your-database-connection-string"
SESSION_SECRET="your-session-secret"
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Routes

- `/` - Main page
- `/auth` - Authentication routes
- `/admin` - Admin dashboard routes

## Security Features

- Session-based authentication
- Password hashing with bcryptjs
- Secure cookie configuration
- Environment variable protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
