import jsonwebtoken from "jsonwebtoken"

export const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")

    if (!accessToken) return res.status(400).json({ error: "User not logged in" })

    try {
        const isValidToken = jsonwebtoken.verify(accessToken, process.env.jsonwebtokensecret)
        req.user = isValidToken;
        if (isValidToken) return next();

    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
}