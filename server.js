const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const dbconnect = require("./config/db");
const eventRoute = require("./routes/eventRoute");
const userRoute =  require("./routes/userRoute")

//middleware
app.use(express.json());

//Routes
app.use("/api/event", eventRoute);
app.use("/api/user",userRoute)


//call database
dbconnect();

//home api
app.get("/", (req, res) => {
  res.send("ok");
  console.log(req);
});


//PORT
app.listen(process.env.PORT, () => {
  console.log("server has been started");
});
