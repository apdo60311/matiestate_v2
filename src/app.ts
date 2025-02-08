import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import reportRoutes from "./routes/report.routes";
import userRoutes from "./routes/user.routes";
import bookingRoutes from "./routes/booking.routes";
import otherRoutes from "./routes/other.routes";
import customerRoutes from "./routes/customer.routes";
import ownerRoutes from "./routes/owner.routes";
import supervisorRoutes from "./routes/supervisor.routes";
import servicesRoutes from "./routes/services.routes";
import workerRoutes from "./routes/worker.routes";


const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const v1Router = express.Router();

v1Router.use('/reports', reportRoutes);
v1Router.use('/users', userRoutes);
v1Router.use('/bookings', bookingRoutes);
v1Router.use('/customer', customerRoutes);
v1Router.use('/owner', ownerRoutes);
v1Router.use('/supervisor', supervisorRoutes);
v1Router.use('/services', servicesRoutes);
v1Router.use('/worker', workerRoutes);
v1Router.use('/other', otherRoutes);

app.use('/api/v1', v1Router);

app.get('/health',(req, res) => {
    res.send('OK');
});



export default app;