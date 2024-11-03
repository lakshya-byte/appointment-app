import jwt from "jsonwebtoken";

//admin authentication middleware

export const adminAuth = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    console.log(atoken);
    

    if (!atoken) {
      return res.json({
        success: false,
        message: "not authorised",
      });
      // console.log('');
      
    }
    const token_Decode = jwt.verify(atoken, process.env.JWT_SECRET);
    

    if (token_Decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      console.log(jwt.decode(token_Decode))
      return res.json({
        success: false,
        message: "not authorised 2",
      });

    }
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
