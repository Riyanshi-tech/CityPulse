import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error("Error:", err);

  if (err.name === "ZodError") {
    const issues = err.issues || err.errors || [];
    return res.status(400).json({
      success: false,
      message: issues[0]?.message || "Validation failed",
      errors: issues
    });
  }

  if (err.code === "P2002") {
    const fields = err.meta?.target || "unknown field";
    return res.status(409).json({
      success: false,
      message: `${fields} already exists`,
      error: `Unique constraint failed on ${fields}`
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};