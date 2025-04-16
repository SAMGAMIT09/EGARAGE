const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Express Object
const app = express();
app.use(cors());
app.use(express.json());

// Database Connection 
mongoose.connect("mongodb+srv://admin:3pWfFyZ2If0utKuc@cluster0.prz0yor.mongodb.net/EGARAGE")
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

// // Importing Routes
const roleRoutes = require("./src/routes/RoleRoutes");
const userRoutes = require("./src/routes/UserRouter");
const stateRoutes = require("./src/routes/StateRoutes");
const cityRoutes = require("./src/routes/CityRoutes");
const areaRoutes = require("./src/routes/AreaRoutes");
const vehicleRoutes = require("./src/routes/VehicleRoutes");
const paymentRoutes = require("./src/routes/PaymentRoutes");
const serviceproviderrouter = require("./src/routes/ServiceProviderRoutes");
const servicerouter = require("./src/routes/ServiceRoutes");
const router = require("./src/routes/AppointmentRoutes");
// New Auth Routes
const authRoutes = require("./src/routes/AuthRoutes");
const dashboardRoutes = require("./src/routes/DashboardRoutes");

// Using Routes 
app.use("/role", roleRoutes);
app.use("/user", userRoutes);
app.use("/state", stateRoutes);
app.use("/city", cityRoutes);
app.use("/area", areaRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/serviceProvider", serviceproviderrouter);
app.use("/service", servicerouter);
app.use("/appointment", router);
app.use("/payment", paymentRoutes);
// New Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 E-Garage API is Running...");
});

// Server Creation
const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server started on http://localhost:${PORT}`);
});