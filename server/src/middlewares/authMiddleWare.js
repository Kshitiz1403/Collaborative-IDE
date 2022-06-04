import { verify } from "jsonwebtoken"
import secrets from "../../secrets"

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")

    if (!accessToken) return res.json({ error: "User not logged in" })

    try {
        const isValidToken = verify(accessToken, secrets.jsonwebtokensecret)

        if (isValidToken) return next();

    }
    catch (err) {
        return res.send({ error: err })
    }
}

module.exports = {validateToken}