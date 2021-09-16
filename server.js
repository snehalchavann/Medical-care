const express = require('express');
const path = require('path');
const app = express();
let cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const router = require('./mongoRouting');
var mongoose = require("mongoose");
// const url = 'mongodb+srv://yash:yash1995@snakeandladder-4nxaa.gcp.mongodb.net/Assignment?retryWrites=true&w=majority';
// const url = 'mongodb+srv://Harshika:Harshika@123@medical-care.qp8o8.mongodb.net/MedicalDatabase?retryWrites=true&w=majority'
// const options = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     autoIndex: false, // Don't build indexes
//     reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//     reconnectInterval: 500, // Reconnect every 500ms
//     poolSize: 10000, // Maintain up to 10 socket connections
//     // If not connected, return errors immediately rather than waiting for reconnect
//     bufferMaxEntries: 0,
//     connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
//     socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     family: 4 // Use IPv4, skip trying IPv6
// };

// mongoose.connect(url, options);

// const connection = mongoose.connection;

// connection.once("open", function () {
//     console.log("MongoDB database connection established successfully");
// });

mongoose
  .connect(
    `mongodb+srv://apurva16:webdesign5@cluster0.dhbrq.mongodb.net/users?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', router);

const port = process.env.PORT || 3000;
http.listen(port, () => console.log(`Server started on port ${port}`));