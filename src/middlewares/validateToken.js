import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {

    const { token } = req.cookies

    if (!token) return res.sendStatus(401).json({ message: "No token valid, authorization denied" })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (!err) return res.sendStatus(403).json({ message: "Invalid token" })
        console.log(user)
        next()
    }
    )
}