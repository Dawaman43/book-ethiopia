const jwt = require("jsonwebtoken");

// roles: optional array of allowed roles for route
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      if (!authHeader)
        return res
          .status(401)
          .json({ message: "No authentication token, authorization denied" });

      const token = authHeader.replace("Bearer ", "");
      if (!token)
        return res
          .status(401)
          .json({ message: "No token provided, authorization denied" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded)
        return res
          .status(401)
          .json({ message: "Token verification failed, authorization denied" });

      req.user = decoded; // attach full user info from token

      // role-based access check
      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access forbidden: insufficient rights" });
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
