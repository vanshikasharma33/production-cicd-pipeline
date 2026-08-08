const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Route for the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
