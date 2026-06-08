import { type Request, type Response, type NextFunction } from "express";
import jwt, { TokenExpiredError, type JwtPayload } from "jsonwebtoken";

interface DecodedPayload extends JwtPayload {
  userId: string;
}

interface AuthRequest extends Request {
  user?: any;
}

export const protectRoute = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided!" });
      return;
    }

    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured.");

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedPayload;
      req.user = decoded.userId;
      next();
    } catch (error) {
      const message =
        error instanceof TokenExpiredError
          ? "Unauthorized - Token expired"
          : "Unauthorized - Invalid token";
      res.json(401).json({ message });
      return;
    }
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};
