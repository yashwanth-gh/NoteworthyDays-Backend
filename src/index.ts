import 'dotenv/config'
import { app } from './app.js';
import DB_CONNECT from './db/index.js';

// FIXME: this is just to test the application when there is not internet connection 
// uncomment this after the work is completed

/* DB_CONNECT().then(() => {
    const port = process.env.PORT || 3400;
    app.listen(port, () => {
            console.log("Database connected successfully");
            console.log("Server running on port -->", port);
        })
    })
    .catch((error) => {
        console.log("ERROR :: DB_CONNECT catch :: MongoDB connection failed!");
      }); */

// FIXME: remove this after uncommenting the above code!
    const port = process.env.PORT || 3400;
    app.listen(port, () => {
            console.log("Database connected successfully");
            console.log("Server running on port -->", port);
        })




