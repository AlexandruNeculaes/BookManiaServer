import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import bookRoutes from "./routes/books.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import paymentRoutes from "./routes/payment.js";

//loading the .env file for environmet variables
config({ path: "./dev.env" });
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//routes
app.use("/books", bookRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/payment", paymentRoutes);

const CONNECTION_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

//connecting to the mongoDB datebase and if it successful listening to the requests on server
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
