import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const token = req.cookies?.token;
    if(!token){
        console.log("Oho aliens attack!! Don't Worry!! Authencating middleware is in action...");
        return res.status(401).json({message: "No token provided, Authorization Denied!!"});
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if(err){
            return res.status(401).json({message: 'Token is not valid!'})
        }
        req.user = decode;
        next();
    });
};

export default authenticate;