import express from "express";
import cors from "cors";
import connectDB from "./db/connect.js";
import userRoutes from "./routes/user.js";
import walletRoutes from "./routes/wallet.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);

app.get("/", (req, res) => {
    res.json({ status: "Alright" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`lets fuckinn go`);
});