import jwt from "jsonwebtoken";

//user authentication middleware

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token);

    if (!token) {
      return res.json({
        success: false,
        message: "not authorised",
      });
    
    }
    const token_Decode = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = token_Decode.id
        
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      // message: error.message,
      message: error.message,
    });
  }
};
