const jwt=require('jsonwebtoken');
const User =require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { decode } = require('jsonwebtoken');
// see video 12 from 9:30 
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) 
  {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
 
      user_id=decoded.id;   // used to save the id this will be used in eventController
      next();
      
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports={protect};
