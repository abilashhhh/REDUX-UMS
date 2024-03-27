const express = require("express");
const colors = require("colors");
const connectdb = require('./config/db')
const dotenv = require("dotenv").config();
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;

connectdb()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started`);
});
