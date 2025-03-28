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
import reservationPropertyRoutes from './routes/reservation-property.routes';
import apartmentRoutes from './routes/apartment.routes';
import shopRoutes from './routes/shop.routes';
import parkingRoutes from './routes/parking.routes';
import landRoutes from './routes/land.routes';
import bankRoutes from './routes/bank.routes';
import currencyRoutes from './routes/currency.routes';
import lessorRoutes from './routes/lessor.routes';
import sellerRoutes from './routes/seller.routes';
import patternRoutes from './routes/pattern.routes';
import materialRoutes from './routes/material.routes';
import entriesRoutes from './routes/entries.routes';
import voucherRoutes from './routes/voucher.routes';
import chequeRoutes from './routes/cheque.routes';
import opRoutes from './routes/op.routes';
import billRoutes from './routes/bill.routes';
import accountRoutes from './routes/account.routes';
import { RateLimiting } from './config/rate-limiting.config';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apply rate limitng
app.use((RateLimiting));

const v1Router = express.Router();

v1Router.use('/reports', reportRoutes);
v1Router.use('/users', userRoutes);
v1Router.use('/bookings', bookingRoutes);
v1Router.use('/customer', customerRoutes);
v1Router.use('/supervisor', supervisorRoutes);
v1Router.use('/services', servicesRoutes);
v1Router.use('/worker', workerRoutes);
v1Router.use('/other', otherRoutes);

const v1ClientRouter = express.Router();
v1ClientRouter.use('/buildings', buildingsRoutes);
v1ClientRouter.use('/reservation-properties', reservationPropertyRoutes)
v1ClientRouter.use('/apartments', apartmentRoutes);
v1ClientRouter.use('/shops', shopRoutes);
v1ClientRouter.use('/parkings', parkingRoutes);
v1ClientRouter.use('/lands', landRoutes);
v1ClientRouter.use('/owners', ownerRoutes);
v1ClientRouter.use('/banks', bankRoutes);
v1ClientRouter.use('/currencies', currencyRoutes);
v1ClientRouter.use('/lessors', lessorRoutes);
v1ClientRouter.use('/sellers', sellerRoutes);
v1ClientRouter.use('/patterns', patternRoutes);
v1ClientRouter.use('/materials', materialRoutes);
v1ClientRouter.use('/entries', entriesRoutes);
v1ClientRouter.use('/vouchers', voucherRoutes);
v1ClientRouter.use('/cheques', chequeRoutes);
v1ClientRouter.use('/op', opRoutes);
v1ClientRouter.use('/bill', billRoutes);
v1ClientRouter.use('/accounts', accountRoutes);
v1ClientRouter.use('reports', reportRoutes);

v1Router.use('/client', v1ClientRouter);

app.use('/api/v1', v1Router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.get('/health', (req, res) => {
    res.send('OK');
});



export default app;