import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
  user?: any;
}

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

   
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing"
      });
    }

    // Robust token extraction
    const [scheme, token] = authHeader.split(/\s+/);

    if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
      console.log("Invalid Auth Header Format:", authHeader);
      return res.status(401).json({
        message: "Invalid authorization format. Expected 'Bearer <token>'"
      });
    }

    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.user = decoded;
    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }

};