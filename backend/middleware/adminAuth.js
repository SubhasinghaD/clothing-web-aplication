import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
  try {
    console.log('Authorization Header:', req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('No Authorization header found');
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log('No token found in Authorization header');
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    if (decoded.role !== "admin") {
      console.log('Role check failed:', decoded.role);
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      console.log('Email check failed:', decoded.email, '!=', process.env.ADMIN_EMAIL);
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log('JWT Verification Error:', error.message);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;