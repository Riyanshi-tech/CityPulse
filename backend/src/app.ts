import express from 'express';
import userRoutes from './routes/user.routes';
const app = express();
app.use(express.json());
app.use('/api', userRoutes);

app.get('/',(req,res)=>{
    res.send("citypulse api running");
});
export default app;