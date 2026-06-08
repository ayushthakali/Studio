import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface DecodedPayload extends JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  userId?: any;
}

export const protectRoute = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized - No token provided!" });
      return;
    }

    const token = authHeader.split(" ")[1] as string;

    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured.");

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedPayload;
      req.userId = decoded.userId;
      next();
    } catch (error) {
      const message =
        error instanceof jwt.TokenExpiredError
          ? "Unauthorized - Token expired"
          : "Unauthorized - Invalid token";
      res.status(401).json({ message });
      return;
    }
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};
