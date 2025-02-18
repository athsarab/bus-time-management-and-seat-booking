const express = require("express");

const routes = express.Router();

const Users = require("../models/user");

routes.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required." });
    }

    try {
        // Check if a user with the provided email and password exists
        const user = await Users.findOne({ email, password });
        if (user) {
            // User found, return success and user entry type
            res.json({ success: true, _id: user._id, userEntry: user.userEntry });
        } else {
            // User not found, return failure
            res.json({ success: false, msg: "Invalid email or password." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "An error occurred. Please try again later." });
    }
});




//test
routes.get("/test", (req, res) => res.send("User routes working.."));

routes.post("/", (req, res) => {
    Users.create(req.body).then(() => res.json({ msg: "User added successfully "})).catch(() => res.status(400).json({ msg: "User adding failed "}));
});

routes.get("/", (req, res) => {
    Users.find()
    .then((users) => res.json(users))
    .catch(() => res.status(400).json({ msg:"No users found"}));
});


routes.get("/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        // Return user details with the correct structure
        res.json({ success: true, user: { name: user.name, email: user.email, mNo: user.mNo } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
});

routes.put("/:id", (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg:"Updated succesfully"}))
    .catch(() => res.status(400).json({ msg: "Update failed"}));
});

routes.delete("/:id", (req, res) => {
    Users.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Deleted succesfully"}))
    .catch(() => res.status(400).json({ msg: "Cannot be deleted"}));
});




module.exports = routes;