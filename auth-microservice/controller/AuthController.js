import bcrypt from "bcrypt"
import prisma from "../config/db.config.js"
import jwt from "jsonwebtoken"
class AuthController {
    static async register(req, res) {
        const payload = req.body
        const salt = bcrypt.genSaltSync(10)
        const hasPass = bcrypt.hashSync(req.body.password, salt)
        payload.password = hasPass
        try {
            const user = await prisma.user.create({
                data: payload,
            })

            return res.status(200).json(user)

        } catch (error) {
            res.status(404).send(error)
        }
    }
    static async login(req, res) {
        const { email, password } = req.body

        try {

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (user) {
                const verify = bcrypt.compare(user.password, password)
                if (!verify) {
                    return res.status(400).send({ message: "Invalid email or Password..." })
                }
                const payload = { email: user.email, id: user._id }
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "365d"
                })

                res.status(200).send({ message: "Logged in successfull...", access_token: `Bearer ${token}`, data: user })
            }
            return res.status(501).send({ message: "Invlaid credentials..." })
        } catch (error) {
            res.status(501).send({ message: "something went wrong..." })
        }

    }
}

export default AuthController