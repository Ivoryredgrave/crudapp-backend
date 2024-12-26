import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/user.route.js';
import { EnvConfig } from './config/env.config.js';

const { cors_origin } = EnvConfig();

const app = express();

app.use(cors({ origin: cors_origin }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);

// Error handling middleware: logs the error and sends a 500 response if none is specified.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// 404 middleware: handles undefined routes with a "Route not found" response.
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

export default app;