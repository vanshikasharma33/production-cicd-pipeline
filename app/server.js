const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Alertmanager API
app.get("/api/alertmanager", async (req, res) => {
    try {
        const response = await fetch(
            "http://alertmanager:9093/api/v2/alerts"
        );

        if (!response.ok) {
            throw new Error(
                `Alertmanager returned ${response.status}`
            );
        }

        const alerts = await response.json();

        const firing = alerts.filter(
            alert =>
                alert.status &&
                alert.status.state === "active"
        );

        res.json({
            online: true,
            total: alerts.length,
            firing: firing.length
        });

    } catch (error) {

        console.error(
            "Alertmanager error:",
            error.message
        );

        res.status(503).json({
            online: false,
            total: 0,
            firing: 0,
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `Production app running on port ${PORT}`
    );
});
