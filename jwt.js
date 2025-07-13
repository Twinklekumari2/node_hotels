const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{
    //extract the jwt token from header
    //format of token => bearer eafjgnkogkak......aijgklaio (ye ' ' isse separate hai isiliye split function use kar rhe hai)
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{
        //verify the jwt token
        jwt.verify(token,process.env.JWT_SECRET);

        //attach user information to req object
        req.user = decoded
        next()

    }catch(err){
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
        
    }
}


//function to generate token

const generateToken = (userData) => {

    //generrate a new jet token using user data

    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30}) //30sec
}

module.exports = {jwtAuthMiddleware,generateToken}

