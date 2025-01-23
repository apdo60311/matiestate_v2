import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
// import routes from '@/routes';
import {validateRequest} from './src/middlewares/validation.middleware';
import config from './src/config/env';
import {ApiResponse} from './src/interfaces/response.interface';
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/v1', routes);

app.get('/health',(req, res) => {
    res.send('OK');

    let x : ApiResponse<String>;


});



export default app;