import jwt from "jsonwebtoken";

const verifyToken = (req,res, next) => {
    jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).send({message: 'unauthorized access'})
        }
        console.log('from the middleware "vefiryToken"', decoded);
        next()
    })
}

export default verifyToken;