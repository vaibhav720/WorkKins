const app = require('./app');
const dotenv = require('dotenv');
const connectToDb = require('./config/database')
const ErrorHandler = require('./utils/errorhandler');

// handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
});

// app config
dotenv.config({ path: 'backend/config/config.env' });

// server listen
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is started on port ${process.env.PORT}`);
    connectToDb();
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to unhandled exception');

    server.close(() => {
        process.exit(1);
    });
});