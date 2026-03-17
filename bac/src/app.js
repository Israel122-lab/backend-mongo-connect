const express = require("express");

const app = express();

app.use(express.json()); // this middleware is used to parse the incoming request body as JSON

// import routes
const userRoutes = require('./routes/user-routes')

// routes declaration
app.use("/api/v1/users", userRoutes);

//example route: http://localhost:4000/api/v1/users/register

module.exports = app;