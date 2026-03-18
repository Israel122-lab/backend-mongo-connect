const express = require("express");

const app = express();

app.use(express.json()); // this middleware is used to parse the incoming request body as JSON

// import routes
const userRoutes = require('./routes/user-routes')
const postRoutes = require('./routes/post-route')

// routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

//example route: http://localhost:4000/api/v1/users/register

module.exports = app;