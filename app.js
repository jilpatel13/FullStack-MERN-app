require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");

mongoose
    .connect(process.env.MONGODB_URI || process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("DB connected");
    })
    .catch(console.log("Oops DB connection lost..!!"));


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get("*", (req, res) => {
  res.redirect('index.html');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

