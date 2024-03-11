// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();


const port = process.env.PORT || 3004;

// Import routes
const HealthRoutes = require('./src/routes/health.routes');

// logger middleware
app.use((req, res, next) => {
    const method = req.method; // GET, POST, etc.
    const url = req.originalUrl; // API called
    const dateTime = new Date().toISOString(); // current date and time

    console.log(`Method: ${method}, API: ${url}, Date and Time: ${dateTime}`);

    next(); // pass to next middleware function
});

// Authentication middleware
const authenticateToken = require('./authMiddleware'); // Adjust the path as necessary

// Apply authentication middleware to routes that require it
// For example, if you have a route like /protected-route, apply the middleware like this:
// app.get('/protected-route', authenticateToken, (req, res) => { ... });

app.use(Express.json());

HealthRoutes.registerHealthRoutes(app);

const MongoManager = require('./mongo-manager')
MongoManager.openMongoConnection();

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})