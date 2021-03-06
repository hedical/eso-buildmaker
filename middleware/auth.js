const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {


        let token = req.header("x-auth-token");

        if (!token)
            return res //using a return help to make sure that we wont execute the next bit of code to delete something from db
                .status(401)
                .json({ msg: "No authentification token, authorization denied" })

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        if (!verified)
            return res //using a return help to make sure that we wont execute the next bit of code to delete something from db
                .status(401)
                .json({ msg: "Token verification failed, authorization denied" })

        req.user = verified.id
        next();

    } catch (err) {
        res
            .status(500)
            .json({ error: err.message })
    }

}

module.exports = auth;