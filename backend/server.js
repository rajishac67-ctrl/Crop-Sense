const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let latestMoisture = 0;

app.get("/", (req, res) => {
    res.send("CropSense Backend is Running");
});

app.post("/data", (req, res) => {
    latestMoisture = req.body.moisture;

    console.log("ESP32 Data:", req.body);

    res.json({
        success: true,
        message: "Data received successfully"
    });
});

app.get("/sensor", (req, res) => {
    res.json({
        moisture: latestMoisture
    });
});

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});