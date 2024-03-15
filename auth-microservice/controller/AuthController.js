import bcrypt from "bcrypt"
import prisma from "../config/db.config.js"
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
}

export default AuthController