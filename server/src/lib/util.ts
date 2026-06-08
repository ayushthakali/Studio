import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured.");
if (!JWT_REFRESH_SECRET)
  throw new Error("JWT_REFRESH_SECRET is not configured.");

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: "15m",
  });
  return { accessToken, refreshToken };
};
