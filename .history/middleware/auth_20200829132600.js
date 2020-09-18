const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res //using a return help to make sure that we wont execute the next bit of code to delete something from db
                .status(401)
                .json({ msg: "No authentification token, authorization denied" })

    }
    
}