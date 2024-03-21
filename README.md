# express-rate-limiter-middleware

`express-rate-limiter-middleware` is a middleware for Express.js applications that provides rate limiting functionality to control the number of requests a client can make to the server within a specified time frame.

## Installation

You can install `express-rate-limiter-middleware` via npm:

```bash
npm install express-rate-limiter-middleware
```

## Usage

To use `express-rate-limiter-middleware` in your Express.js application, follow these steps:

1. Import the required modules:

```javascript
const express = require('express');
const redis = require('redis');
const { RateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
```

2. Create an Express app and specify the port:

```javascript
const app = express();
const port = process.env.PORT || 3000;
```

3. Create a Redis client:

```javascript
const redisClient = redis.createClient();
```

4. Set up the rate limiter middleware:

```javascript
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
```

5. Define your routes as usual:

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

6. Start the server:

```javascript
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## Documentation

For more advanced usage and customization options, please refer to the [documentation](https://github.com/example/express-rate-limiter-middleware).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
