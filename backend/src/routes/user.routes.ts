import {Router} from 'express';
import prisma from '../lib/prisma';
 
const router = Router();
router.get("/users",async(req,res)=>{
    const users = await prisma.user.findMany();
    res.json(users);
});
router.post("/users",async(req,res)=>{
    const{username,email,password,firstName,lastName}= req.body;
    const user = await prisma.user.create({
        data:{
            username,
            email,
            password,
            firstName,
            lastName
        }
    });
    res.json(user);
});
export default router;