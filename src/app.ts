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
import buildingsRoutes from "./routes/buildings.routes";
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from "./config/swagger.config"

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

const v1ClientRouter = express.Router();
v1ClientRouter.use('/buildings', buildingsRoutes);

v1Router.use('/client', v1ClientRouter);

app.use('/api/v1', v1Router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.get('/health',(req, res) => {
    res.send('OK');
});



export default app;