import jwt from "jsonwebtoken";

// Doctor authentication middleware
export const doctorAuth = async (req, res, next) => {
  try {
    // Extract dtoken directly from headers
    console.log("Doctor authentication middleware hit");

    const { dtoken } = req.headers; // Corrected key from dToken to dtoken to match the request

    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not authorized",
      });
    }

    // Verify and decode the token
    const token_Decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_Decode.id; // Set the decoded docId in the request body

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ // Changed to 401 Unauthorized status
      success: false,
      message: "Authorization failed",
    });
  }
};
