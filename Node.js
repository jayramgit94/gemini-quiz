import express from "express";
import mongoose from "mongoose";
import admin from "firebase-admin";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin
import serviceAccount from "./firebase-admin-key.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

const UserSchema = new mongoose.Schema({
    uid: String,
    name: String,
    email: String,
    photoURL: String,
});

const User = mongoose.model("User", UserSchema);

// API to save Firebase-authenticated users in MongoDB
app.post("/save-user", async (req, res) => {
    try {
        const { token } = req.body;

        // Verify Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, name, email, picture } = decodedToken;

        // Save user in MongoDB
        const user = new User({ uid, name, email, photoURL: picture });
        await user.save();

        res.json({ success: true, message: "User saved" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));


async function saveUserToMongo() {
    const token = await auth.currentUser.getIdToken();  // Get Firebase token
    await fetch("http://localhost:5000/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });
}
