const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');
const cron = require('node-cron');
const aggregateMonthlyData = require('./controllers/dataAggregator');
const http = require('http')
const AWS = require('aws-sdk')
const asyncHandler = require('express-async-handler');
const { AccessToken } = require('livekit-server-sdk');

const s3 = new AWS.S3();

const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// websocket
io.on('connection', (socket) => {
  console.log('Websocket connection opened')

  // handle job applications
  socket.on('message', (email, action, jobTitle) => {
    console.log(`${email} ${action} ${jobTitle}`)
    io.emit('message', { email, action, jobTitle })
  })

  socket.on('disconnect', () => {
    console.log('WebSocket connection closed')
  })
})


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

app.use('/users', require('./routes/userRoutes'))
app.use('/jobs', require('./routes/jobRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/monthlyData', require('./routes/monthlyDataRoutes'))
app.use('/files', express.static('files')); // Static file serving
app.use('/users/files', require('./routes/fileRoutes'))

app.put('/interview/getToken', asyncHandler(async (req, res) => {
  try {

    const { roomName, participantName } = req.body;
    // identifier to be used for participant.
    // it's available as LocalParticipant.identity with livekit-client SDK

    const at = new AccessToken(process.env.LK_API_KEY, process.env.LK_API_SECRET, {
      identity: participantName,
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return res.status(200).json(at.toJwt())
  } catch (err) {
    return res.status(400).json({ message: 'Bad interview request' })
  }
}));


app.use(errorHandler)

// Schedule a job to run at 00:00 on the first day of every month
cron.schedule('0 0 1 * *', async () => {
  try {
    await aggregateMonthlyData();
    console.log('Data aggregation complete.');
  } catch (error) {
    console.log('Failed to aggregate data:', error);
  }
});

// Schedule a job to run every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  try {
    await aggregateMonthlyData(true); // Update the most recent document
    console.log('Data update complete.');
  } catch (error) {
    console.log('Failed to update data:', error);
  }
});


server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});