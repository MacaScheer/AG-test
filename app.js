const express = require("express");
const mongoose = require("mongoose")
const app = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const resources = require("./routes/api/resources");

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/resources", resources);
app.get("/", (req, res) => res.send("Hello"));




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));