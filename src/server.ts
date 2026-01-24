import { Router, Request, Response } from 'express';
import express from 'express';
const app = express();
const route = Router();
app.use(express.json());


route.get('/get', (req: Request, res: Response) => {
    res.json({ message: 'GET request received' });
});

app.use(route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});