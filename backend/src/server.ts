import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/tasks", taskRoutes);

// basic health
app.get("/", (req, res) => res.send("TaskMate API is running"));

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("Please set MONGO_URI in .env");
  process.exit(1);
}

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
  });
