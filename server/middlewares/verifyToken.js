import jwt from "jsonwebtoken"

const verifyToken = (req,res,next) => {
    
    try {    
    let token = req.header("Authorization")

    if (!token)
        res.status(403).json({"msg": "Token Missing"})

    if (token.startsWith('Bearer '))
        token = token.slice(7, token.length).trimStart();
    

    const userId = jwt.verify(token,process.env.JWT_SECRET).id

    if (!userId) return res.status(403).json({"msg": "Invalid Token"})

    req.verifiedUser = userId
    next()
    } catch(e) {
        console.log(e);
        res.status(500).json({"error": "internal server error"})
    }
}

export default verifyToken