const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); // to read json objects from the request
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./routes/userRouter"))
app.use("/builds", require("./routes/build-routes"))
app.use("/api", require("./routes/api-routes"))



if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

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




