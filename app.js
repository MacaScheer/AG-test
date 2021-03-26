const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const resources = require("./routes/api/resources");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/resources", resources);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));