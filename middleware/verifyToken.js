const jwt = require("jsonwebtoken");
const httpStatusText =require('../utils/httpStatusText')
const appError =require('../utils/appError')
const verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = appError.create("token is require", 401, httpStatusText.ERROR);
        return next(error);
    
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser =await jwt.verify(token, process.env.JWT_SECRET_KEY) ;
    req.currentUser = currentUser ;
    next();
  } catch (err) {
    const error = appError.create("Invalid token", 401, httpStatusText.ERROR);
        return next(error);
    
  }

  
}; 

module.exports = verifyToken;
