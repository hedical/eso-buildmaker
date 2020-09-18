const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// set up express
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
}, (err) => {
    if (err) throw err;
    console.log("MongoDB has been initialized");
})


// const path = require("path");


// app.use(express.urlencoded({ extended: true }));


// const apiRoutes = require("./routes/api-routes");
// app.use(apiRoutes);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }


// app.listen(PORT, () => {
//     console.log(`listening at http://localhost:${PORT}`);
// });