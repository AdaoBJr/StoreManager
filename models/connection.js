const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_NAME = 'StoreManager';

// Connect MongoDB at default port 27017.
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
    } else {
        console.log(`Error in DB connection: ${err}`);
    }
});
