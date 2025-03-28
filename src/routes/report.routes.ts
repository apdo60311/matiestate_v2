import express, { Router } from 'express';
import { IRoute } from '../types/router.types';
import { ReportController } from '../controllers/report.controller';
import { DI_TYPES } from '../di/di.types';
import { container } from '../di/di.config';

const mainRouter: Router = express.Router();
const unitsRouter: Router = express.Router();
const landRouter: Router = express.Router();
const villaRouter: Router = express.Router();
const parkingRouter: Router = express.Router();
const propertiesRouter: Router = express.Router();
const contractsRouter: Router = express.Router();



(async () => {
  const reportController = await container.getAsync<ReportController>(
    DI_TYPES.ReportController
  );


  // Financial Reports
  const financialRoutes: IRoute[] = [
    { path: '/balance-sheet', method: "get", handler: reportController.balanceSheetReport },
    { path: '/profit-and-loss', method: "get", handler: reportController.profitAndLossReport },
    { path: '/trial-balance', method: "get", handler: reportController.trialBalanceReport },
    { path: '/general-ledger', method: "get", handler: reportController.generalLedgerReport },
    { path: '/journal-ledger', method: "get", handler: reportController.journalLedgerReport },
  ];
  financialRoutes.forEach(route => mainRouter[route.method](route.path, route.handler));

  // Inventory Reports
  const inventoryRoutes: IRoute[] = [
    { path: '/inventory', method: "get", handler: reportController.inventoryReport },
    { path: '/ending-inventory', method: "get", handler: reportController.endingInventoryReport },
    { path: '/item-activity', method: "get", handler: reportController.itemActivityReport },
  ]

  inventoryRoutes.forEach(route => mainRouter[route.method](route.path, route.handler));

  // Billing Reports
  const billingRoutes: IRoute[] = [
    { path: '/bill-details', method: "get", handler: reportController.billDetailsReport },
    { path: '/bill-profit', method: "get", handler: reportController.billProfitReport },
    { path: '/sales', method: "get", handler: reportController.salesReport },
  ]
  billingRoutes.forEach(route => mainRouter[route.method](route.path, route.handler));

  // Other Reports
  const otherRoutes: IRoute[] = [
    { path: '/contracts', method: 'post', handler: reportController.contractReport },
    { path: '/changes-flats-rent-pricing', method: 'post', handler: reportController.changesFlatsRentPricing },
    { path: '/complaints', method: 'post', handler: reportController.reportsComplaintsReportController },
    { path: '/warehouse', method: 'post', handler: reportController.reportsWareHouseReportController },
    { path: '/worker', method: 'post', handler: reportController.reportsWorkerReportController },
    { path: '/owner-expenses', method: 'post', handler: reportController.reportsOwnerExpensesReportController },
    { path: '/worker/service-report', method: 'get', handler: reportController.reportsWorkerServiceReportController },
    { path: '/customer/reports', method: 'get', handler: reportController.getCustomerReportsContoller }
  ];
  otherRoutes.forEach(route => mainRouter[route.method](route.path, route.handler));

  // Units Routes
  unitsRouter.post('/leased', reportController.unitLeasedReport);
  unitsRouter.post('/sold', reportController.unitSoldReport);
  unitsRouter.post('/vacated', reportController.unitsVacatedReport);
  unitsRouter.post('/reserved', reportController.unitsReservedReport);

  // Land Routes
  landRouter.post('/leased', reportController.landLeasedReport);
  landRouter.post('/sold', reportController.landSoldReport);

  // Villa Routes
  villaRouter.post('/leased', reportController.villaLeasedReport);
  villaRouter.post('/sold', reportController.villaSoldReport);

  // Parking Routes
  parkingRouter.post('/leased', reportController.parkingLeasedReport);

  // Properties Routes
  propertiesRouter.post('/leased', reportController.leasedPropertyReport);

  // Contracts Routes
  contractsRouter.post('/deposit', reportController.contractsDepositReport);
  contractsRouter.post('/near-expiration', reportController.contractNearToExpireReport);
  contractsRouter.post('/expired', reportController.contractExpiredReport);

  mainRouter.use('/units', unitsRouter);
  mainRouter.use('/land', landRouter);
  mainRouter.use('/villa', villaRouter);
  mainRouter.use('/parking', parkingRouter);
  mainRouter.use('/properties', propertiesRouter);
  mainRouter.use('/contracts', contractsRouter);


  /**
   * @swagger
   * /reports/generate:
   *   post:
   *     summary: Generate a report using the report facade
   *     tags: [Reports]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - type
   *               - filter
   *             properties:
   *               type:
   *                 type: string
   *                 enum: [BALANCE_SHEET, PROFIT_LOSS, TRIAL_BALANCE, JOURNAL_LEDGER, GENERAL_LEDGER]
   *                 description: The type of report to generate
   *               filter:
   *                 type: object
   *                 properties:
   *                   date_from:
   *                     type: string
   *                     format: date
   *                     description: Start date for report period
   *                   date_to:
   *                     type: string
   *                     format: date
   *                     description: End date for report period
   *                   account_id:
   *                     type: string
   *                     description: Filter by specific account ID
   *                   level:
   *                     type: number
   *                     description: Hierarchy level for the report
   *     responses:
   *       200:
   *         description: Report generated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Report generated successfully
   *                 data:
   *                   type: object
   *       500:
   *         description: Server error while generating report
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   */
  mainRouter.post('/generate', reportController.generateReport);


})()


export default mainRouter;
