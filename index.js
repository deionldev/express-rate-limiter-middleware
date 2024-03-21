const express = require('express');
const redis = require('redis');
const { RateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');

const app = express();
const port = process.env.PORT || 3000;

// Create a Redis client
const redisClient = redis.createClient();

// Set up rate limiter: maximum of 100 requests per minute
const limiter = new RateLimit({
  store: new RedisStore({
    client: redisClient
  }),
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});

// Apply rate limiter to all routes
app.use(limiter);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Custom route with a separate rate limiter
const customLimiter = new RateLimit({
  store: new RedisStore({
    client: redisClient
  }),
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // limit each IP to 50 requests per windowMs
  message: "Too many requests for this custom route, please try again later."
});
app.get('/custom', customLimiter, (req, res) => {
  res.send('Custom route!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
