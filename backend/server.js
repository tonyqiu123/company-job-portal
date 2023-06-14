const express = require('express');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Configure rate limiting middleware
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120, // Limit each IP to 120 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
// Apply rate limiting middleware to all routes
app.use(rateLimiter);

// Enable CORS
app.use(cors());

// Configure Content-Security-Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
