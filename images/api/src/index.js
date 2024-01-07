
const app = require('./app.js'); // Import the Express.js application
const port = process.env.PORT || 3000; // Set the port or use default 3000

// Start the Express.js server
app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is listening on port ${port}`);
    } else {
        console.error(err);
    }
});
