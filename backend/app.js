const express = require("express")
const connectToDB = require("./config/connectToDb")
require("dotenv").config();

const cors = require("cors");
const {notFound , errorHandler} = require("./middlewares/error")

// connection To DB
connectToDB()

// Init App
const app = express()

app.use(express.json())

// Cors Policy
app.use(cors({
    origin:"http://localhost:3000"
}));

// run the server
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`the server is running on post ${PORT}`)
})


app.use("/api/auth", require("./routes/authRoute"));

app.use("/api/users", require("./routes/usersRoute"));

app.use("/api/posts", require("./routes/postsRoute"));

app.use("/api/comments", require("./routes/commentsRoute"));

app.use("/api/categories", require("./routes/categoriesRoute"));


// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);
