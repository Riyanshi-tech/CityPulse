import { Request, Response } from "express";
import { getAllUsers, createUser } from "../services/user.services";
import { createUserSchema } from "../validations/user.validation";
import { hashpassword } from "../utils/hash";


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const creatUserController = async (req: Request, res: Response, next: import("express").NextFunction) => {
    try {

        const validatedData = createUserSchema.parse(req.body); 
        const { username, email, password, firstName, lastName, role } = validatedData;
        const hashedpassword = await hashpassword(password);
        const user = await createUser({ username, email, password:hashedpassword, firstName, lastName, role });
        console.log("User created successfully:", user);
       return  res.status(201).json(user);
    } catch (error: any) {

        next(error);
    }
};
