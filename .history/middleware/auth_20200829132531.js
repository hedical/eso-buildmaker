const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res
            .status(401).
        .json({ msg: "No authentification token, authorization denied" }) //using a return help to make sure that we wont execute the next bit of code to delete something from db
}