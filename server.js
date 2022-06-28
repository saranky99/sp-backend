const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const dbconnect = require("./config/db");
// const eventRoute = require("./routes/eventRoute");
// const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
// const studentProfileRoute = require("./routes/studentProfileRoute");
// const eventBookingRoute = require("./routes/eventBookingRoute");
const { v4: uuidv4 } = require("uuid");
//middleware
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

//Routes
app.use("/api/blog", blogRoute);
// app.use("/api/event", eventRoute);
// app.use("/api/user", userRoute);
// app.use("/api/studentprofile", studentProfileRoute);
// app.use("/api/eventbooking", eventBookingRoute);

//call database
dbconnect();

//home api
app.get("/", (req, res) => {
  res.send("ok");
  console.log(req);
});

//payemt
app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { data, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencykey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: data.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${data.title}`,
        shipping: {
          name: token.card.name,
        },
      },
      {
        idempotencykey,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

//PORT
app.listen(process.env.PORT, () => {
  console.log("server has been started");
});
