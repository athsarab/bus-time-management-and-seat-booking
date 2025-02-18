const express = require("express");
const dbConnection = require("./config/db");
const routes = require("./routes/users");
const routes1 = require("./routes/ReportRoutes");
const routes2 = require("./routes/employees");
const routes3 = require("./routes/books");
const routes4 = require("./routes/luggages");
const routes5 = require("./routes/reviews");
const routes6 = require("./routes/packages");
const routes7 = require("./routes/busRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: true, credentials: true}));

//DB Connection
dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get("/", (req,res) => res.send("Server is running"));
app.use("/api/users", routes);
app.use("/api/ReportRoutes", routes1);
app.use("/api/employees", routes2);
app.use("/api/books", routes3);
app.use("/api/luggages", routes4);
app.use("/api/reviews", routes5);
app.use("/api/packages", routes6);
app.use("/api/busRoutes", routes7);


const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));