import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) => {
    const {token} = req.headers; //Firt we will get the token
    if(!token) {
        return res.json({success:false, message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET); //Here we will decode the token and verify it with JWT_SECRET key
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export default authMiddleware;