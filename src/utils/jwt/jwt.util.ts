import * as jwt from "jsonwebtoken";

const secret = Buffer.from(process.env.JWT_SECRET, "base64");

class JWT {
    static signToken(user) {
        return jwt.sign({ name: user.name, id: user.id }, secret, {
            expiresIn: 86400 // expires in 24 hours
        });
    }

    static validateToken(token) {
        return jwt.verify(token, secret);
    }
}

export default JWT;