import express from 'express';
import cors from 'cors';
import experiences from './api/experiences.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/experiences", experiences)
app.use("*", (req, res)=>res.status(404).json({error: "not found"}))

export default app;