# 🚀 TaskFlow - Team Task Management SaaS

A modern, production-ready Full Stack Task Management application built with React, Node.js, Express, and PostgreSQL. Features real-time updates, beautiful data visualizations, and a premium user interface.

![TaskFlow Banner](https://via.placeholder.com/1200x400/0ea5e9/ffffff?text=TaskFlow+-+Modern+Task+Management)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with HttpOnly cookies
- ⚡ **Optimistic UI Updates** - Lightning-fast user interactions
- 📊 **Data Visualization** - Beautiful charts and progress tracking
- 🎨 **Premium UI/UX** - Modern dark theme with Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔔 **Toast Notifications** - Real-time feedback for user actions
- 🎯 **Task Management** - Create, update, delete, and filter tasks
- 📈 **Analytics Dashboard** - Track productivity with stats cards

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 (with Vite)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **Recharts** - Data visualization library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Prisma** - Next-generation ORM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation

### DevOps & Deployment
- **Netlify** - Frontend hosting
- **Render** - Backend & database hosting
- **Git** - Version control

## 📁 Project Structure

```
Team Task Management SaaS/
├── client/                  # React frontend
│   ├── src/
│   │   ├── api/            # API service layer
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                  # Node.js backend
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   ├── prisma/             # Prisma schema & migrations
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Comes with Node.js

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd "Team Task Management SaaS"
```

### Step 2: Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

Or use the convenient script:

```bash
npm run install:all
```

### Step 3: Set Up PostgreSQL Database

1. **Create a new PostgreSQL database:**

```bash
# Using psql command line
psql -U postgres
CREATE DATABASE taskmanager;
\q
```

Or using pgAdmin:
- Open pgAdmin
- Right-click on "Databases" → "Create" → "Database"
- Name it `taskmanager`

2. **Get your database connection URL:**

The format is: `postgresql://username:password@localhost:5432/taskmanager`

Example: `postgresql://postgres:mypassword@localhost:5432/taskmanager`

### Step 4: Configure Environment Variables

Create a `.env` file in the `server` folder:

```bash
cd server
copy .env.example .env
```

Edit `server/.env` with your actual values:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskmanager"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Important:** Replace `username` and `password` with your PostgreSQL credentials!

### Step 5: Run Database Migrations

```bash
# Make sure you're in the server directory
cd server

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

This will create the `users` and `tasks` tables in your database.

### Step 6: Start the Development Servers

From the **root directory**, run:

```bash
npm run dev
```

This will start both servers concurrently:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

You can also run them separately:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Step 7: Open the Application

Navigate to **http://localhost:5173** in your browser!

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/logout`
Logout the current user.

#### GET `/api/auth/me`
Get current user profile (protected).

### Task Endpoints (All Protected)

#### GET `/api/tasks`
Get all tasks for the logged-in user.

#### POST `/api/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "TODO",
  "priority": "HIGH"
}
```

#### PUT `/api/tasks/:id`
Update a task.

#### DELETE `/api/tasks/:id`
Delete a task.

## 🎨 Features Showcase

### 1. **Authentication**
- Secure JWT-based authentication
- Password hashing with bcrypt
- HttpOnly cookies for token storage
- Beautiful split-screen login/register page

### 2. **Dashboard**
- Real-time task statistics
- Interactive pie chart showing task distribution
- Completion rate progress bar
- Color-coded priority and status indicators

### 3. **Task Management**
- Create tasks with title, description, status, and priority
- Update task status with inline editing
- Delete tasks with confirmation
- Filter tasks by status (All, To Do, In Progress, Done)

### 4. **Optimistic UI**
- Instant UI updates before server response
- Automatic rollback on errors
- Seamless user experience

## 🧪 Testing

### Manual Testing Checklist

- [ ] Register a new user
- [ ] Login with credentials
- [ ] Create multiple tasks with different priorities
- [ ] Update task status
- [ ] Delete a task
- [ ] Filter tasks by status
- [ ] Check responsive design on mobile
- [ ] Verify toast notifications
- [ ] Test logout functionality

### Database Inspection

Use Prisma Studio to inspect your database:

```bash
cd server
npx prisma studio
```

This opens a visual database browser at http://localhost:5555

## 🚢 Deployment

### Deploying to Render (Backend) + Netlify (Frontend)

#### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a PostgreSQL Database:**
   - Click "New +" → "PostgreSQL"
   - Choose a name (e.g., `taskmanager-db`)
   - Copy the **Internal Database URL**

3. **Create a Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Root Directory:** `server`
     - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
     - **Start Command:** `npm start`
   - Add environment variables:
     - `DATABASE_URL`: Your Internal Database URL from step 2
     - `JWT_SECRET`: A random secret string
     - `NODE_ENV`: `production`
     - `CLIENT_URL`: Your Netlify URL (add after frontend deployment)

4. **Deploy!** Render will build and deploy your backend.

#### Frontend Deployment (Netlify)

1. **Update API URL:**
   
   In `client/src/api/api.js`, update the baseURL:
   ```javascript
   const api = axios.create({
     baseURL: 'https://your-render-backend.onrender.com/api',
     // ... rest of config
   });
   ```

2. **Build the frontend:**
   ```bash
   cd client
   npm run build
   ```

3. **Deploy to Netlify:**
   - Sign up at [netlify.com](https://www.netlify.com)
   - Drag and drop the `client/dist` folder
   - Or connect your GitHub repo and set:
     - **Base directory:** `client`
     - **Build command:** `npm run build`
     - **Publish directory:** `client/dist`

4. **Update CORS:**
   
   Update `CLIENT_URL` in your Render environment variables with your Netlify URL.

## 📝 Environment Variables Summary

### Server (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/taskmanager` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-key` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Icons by [Lucide](https://lucide.dev/)
- UI inspired by modern SaaS applications

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with 💙 by Your Team**

Happy Task Managing! 🎉
