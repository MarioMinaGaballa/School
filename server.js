// Import the app from your new app.js file
const app = require('./app');

const port = process.env.PORT || 5000;

// This is the only place app.listen should be called
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});