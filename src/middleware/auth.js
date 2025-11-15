import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const auth = (roles = []) => {
  return (req, res, next) => {
    console.log("Request is received where we need to fetch token for it");
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("Token fetched is ", token);
    if (!token) return res.status(401).json({success:false, message: "Token missing" });
    console.log("Now messing up with token");
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
    //   console.log("Got the verified token ",decoded);
      req.user = decoded;

      console.log("Matching the permission asked as per token");
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success:false,message: "Forbidden" });

      }

      next();
    } catch (err) {
      console.log("Error in token verification", err);
      res.status(401).json({success:false, message: "Invalid token laude" });
    }
  };
};
