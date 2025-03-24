import express, { Router } from 'express';
import * as ReportController from '../controllers/report.controller';
import { IRoute } from '@/types/router.types';

const mainRouter: Router = express.Router();
const unitsRouter: Router = express.Router();
const landRouter: Router = express.Router();
const villaRouter: Router = express.Router();
const parkingRouter: Router = express.Router();
const propertiesRouter: Router = express.Router();
const contractsRouter: Router = express.Router();

// Financial Reports
const financialRoutes: IRoute[] = [
  { path: '/balance-sheet', method: "get", handler: ReportController.balanceSheetReport },
  { path: '/profit-and-loss', method: "get", handler: ReportController.profitAndLossReport },
  { path: '/trial-balance', method: "get", handler: ReportController.trialBalanceReport },
  { path: '/general-ledger', method: "get", handler: ReportController.generalLedgerReport },
  { path: '/journal-ledger', method: "get", handler: ReportController.journalLedgerReport },
];
financialRoutes.forEach(route => mainRouter[route.method](route.path, route.handler));

// Inventory Reports
const inventoryRoutes: IRoute[] = [
  { path: '/inventory', method: "get", handler: ReportController.inventoryReport },
  { path: '/ending-inventory', method: "get", handler: ReportController.endingInventoryReport },
  { path: '/item-activity', method: "get", handler: ReportController.itemActivityReport },
]

inventoryRoutes.forEach(route => mainRouter[route.method](route.path, route.handler));

// Billing Reports
const billingRoutes: IRoute[] = [
  { path: '/bill-details', method: "get", handler: ReportController.billDetailsReport },
  { path: '/bill-profit', method: "get", handler: ReportController.billProfitReport },
  { path: '/sales', method: "get", handler: ReportController.salesReport },
]
billingRoutes.forEach(route => mainRouter[route.method](route.path, route.handler));

// Other Reports
const otherRoutes: IRoute[] = [
  { path: '/contracts', method: 'post', handler: ReportController.contractReport },
  { path: '/changes-flats-rent-pricing', method: 'post', handler: ReportController.changesFlatsRentPricing },
  { path: '/complaints', method: 'post', handler: ReportController.reportsComplaintsReportController },
  { path: '/warehouse', method: 'post', handler: ReportController.reportsWareHouseReportController },
  { path: '/worker', method: 'post', handler: ReportController.reportsWorkerReportController },
  { path: '/owner-expenses', method: 'post', handler: ReportController.reportsOwnerExpensesReportController },
  { path: '/worker/service-report', method: 'get', handler: ReportController.reportsWorkerServiceReportController },
  { path: '/customer/reports', method: 'get', handler: ReportController.getCustomerReportsContoller }
];
otherRoutes.forEach(route => mainRouter[route.method](route.path, route.handler));

// Units Routes
unitsRouter.post('/leased', ReportController.unitLeasedReport);
unitsRouter.post('/sold', ReportController.unitSoldReport);
unitsRouter.post('/vacated', ReportController.unitsVacatedReport);
unitsRouter.post('/reserved', ReportController.unitsReservedReport);

// Land Routes
landRouter.post('/leased', ReportController.landLeasedReport);
landRouter.post('/sold', ReportController.landSoldReport);

// Villa Routes
villaRouter.post('/leased', ReportController.villaLeasedReport);
villaRouter.post('/sold', ReportController.villaSoldReport);

// Parking Routes
parkingRouter.post('/leased', ReportController.parkingLeasedReport);

// Properties Routes
propertiesRouter.post('/leased', ReportController.leasedPropertyReport);

// Contracts Routes
contractsRouter.post('/deposit', ReportController.contractsDepositReport);
contractsRouter.post('/near-expiration', ReportController.contractNearToExpireReport);
contractsRouter.post('/expired', ReportController.contractExpiredReport);

mainRouter.use('/units', unitsRouter);
mainRouter.use('/land', landRouter);
mainRouter.use('/villa', villaRouter);
mainRouter.use('/parking', parkingRouter);
mainRouter.use('/properties', propertiesRouter);
mainRouter.use('/contracts', contractsRouter);

export default mainRouter;
