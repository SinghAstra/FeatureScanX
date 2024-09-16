import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("In auth req.cookies is ", JSON.stringify(req.cookies));
  const token = req.cookies?.token;

  console.log("token is ", token);

  if (!token) {
    return res.status(404).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
