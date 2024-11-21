const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const User = require("./models/User");
const app = express();
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", vehicleRoutes);
app.use("/", dashboardRoutes);
app.get("/", (req, res) => res.render("index"));

app.use((req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies.token) {
    return res.redirect("/login");
  }
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
