import express from 'express';
import cors from 'cors';
import namesRoutes from './routes/namesRoutes.js';
import rateLimiterUsingThirdParty from './middlewares/rateLimiter.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/', rateLimiterUsingThirdParty, namesRoutes);

export default app;
