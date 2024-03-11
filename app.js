// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const bodyParser = require('body-parser');
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

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(Express.json());

// /agent-create endpoint
app.post('/agent-create', (req, res) => {
    const { first_name, last_name, email, region } = req.body;

    //check if req fields provided
    if (!first_name || !last_name || !email || !region) {
        return res.status(400).send({
            success: false,
            message: 'first_name, last_name, email and region are required'
        });
    }

    //Set sales to 0 and default values
    const agent = {
        first_name,
        last_name,
        email,
        region,
        sales: 0, // makes sales 0
        //any additional defaults would go here
    };
    //return agent object
    res.status(201).send({
        success: true,
        message: 'Agent created successfully',
        agent
    });
});

HealthRoutes.registerHealthRoutes(app);

const MongoManager = require('./src/shared/db/mongodb/mongo-manager')
MongoManager.openMongoConnection();

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})