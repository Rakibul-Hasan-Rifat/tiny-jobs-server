import jwt from "jsonwebtoken";

const verifyToken = (req,res, next) => {
    console.log('verify token', req.cookies.token, process.env.SECRET_KEY);
    jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).send({message: 'unauthorized access'})
        }
        console.log('from the middleware "vefiryToken"', decoded);
        req.user = {...decoded}
        next()
    })
}

export default verifyToken;