const express = require('express');
const cors = require('cors');
require('dotenv').config();
const locationRoutes = require("./backend/routes/locationRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/locations", locationRoutes);

app.get('/', (req, res) => {
    res.send('TH-platform API Running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
