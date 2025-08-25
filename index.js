import express from "express";
import mongoose from "mongoose";
import departmentRoutes from "./routes/departmentRoutes.js";
import bcrypt from "bcryptjs";
import routes from "./routes/route.js";
import cookieParser from "cookie-parser";
import Employee from "./models/employee.js";
import dbConnect from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads/"));

// Connect to the database
app.use(
  cors({
    origin: ["http://localhost:5173", 'https://mern-frontend-three-dun.vercel.app'],
    credentials: true,
  })
);

dbConnect()
  .then(() => {
    console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                         DATABASE CONNECTION: SUCCESS             ║
║                 MongoDB is connected and ready for queries       ║
╠══════════════════════════════════════════════════════════════════╣
║                 SERVER RUNNING AT: http://localhost:${port}         ║
╚══════════════════════════════════════════════════════════════════╝
    `);

    // Start the server after successful DB connection
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`
╔═════════════════════════════════════════════════════════════════════╗
║                         DATABASE CONNECTION: FAILED                 ║
║                  Error occurred while connecting to MongoDB         ║
╠═════════════════════════════════════════════════════════════════════╣
${error}                                                              ║
╚═════════════════════════════════════════════════════════════════════╝
    `);
    process.exit(1);
  });

// Set up routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello");
});
const seedAdmin = async () => {
  try {
    const admin = await Employee.findOne({ email: "admin@gmail.com" });
    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await Employee.create({
        name: "Admin admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
        department: "68958246ce83e66703d2c767",
        designation: "Technical Lead",
        salary: 115000,
        profileImage: "https://example.com/images/niraj.jpg",
        phoneNumber: "9809988776",
        address: "Pokhara, Gandaki",
        dateOfJoining: "2020-02-10T00:00:00.000Z",
        isActive: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
seedAdmin();
