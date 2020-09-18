const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); // to read json objects from the request
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
    if (err) throw err;
    console.log("MongoDB has been initialized");
})


app.use("/users", require("./routes/userRouter"))
app.use("/builds", require("./routes/build-routes"))
// app.use("/builds/:build_id/gears", require("./routes/gear-routes"))
app.use("/api", require("./routes/api-routes"))

