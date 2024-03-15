import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader === null || authHeader === undefined) {
        res.status(401).send({ message: "Un Authorized..." })
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).send({ message: "Invalid Token" })
        }
        req.user = payload
        next()
    })

}

export default authMiddleware