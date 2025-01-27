import express from 'express';
import { IRoute } from "@/types/router.type";
import { CompanyController, ManagerController, PackageController, StatisticsController, TenantController } from '../controllers/admin.controller';
import { isManagerPreHandler, isSuperAdminPreHandler } from '@/middlewares/auth';

const mainRouter = express.Router();

const companyRouter = express.Router();
const packageRouter = express.Router();
const tenantRouter = express.Router();
const managerRouter = express.Router();
const statisticsRouter = express.Router();


const companyRoutes : IRoute[] = [
    {
        path: '/',
        method: 'post',
        handler: CompanyController.create
    },
    {
        path: '/',
        method: 'get',
        handler: CompanyController.getAll
    },
    {
        path: '/:id',
        method: 'get',
        handler: CompanyController.getOne
    },
    {
        path: '/:id',
        method: 'patch',
        handler: CompanyController.update
    },
    {
        path: '/:id',
        method: 'delete',
        handler: CompanyController.delete
    }
];
companyRoutes.forEach(route => companyRouter[route.method](route.path, isManagerPreHandler, route.handler));

const packageRoutes: IRoute[] = [
    {
        path: '/',
        method: 'post',
        middlewares: [isSuperAdminPreHandler],
        handler: PackageController.create
    },
    {
        path: '/',
        method: 'get',
        middlewares: [isManagerPreHandler],
        handler: PackageController.getAll
    },
    {
        path: '/:id',
        method: 'get',
        middlewares: [isManagerPreHandler],
        handler: PackageController.getOne
    },
    {
        path: '/:id',
        method: 'patch',
        middlewares: [isSuperAdminPreHandler],
        handler: PackageController.update
    },
    {
        path: '/:id',
        method: 'delete',
        middlewares: [isSuperAdminPreHandler],
        handler: PackageController.delete
    }
];
packageRoutes.forEach(route => packageRouter[route.method](route.path, ...(route.middlewares || []), route.handler));


const tenantRoutes: IRoute[] = [
    {
        path: '/',
        method: 'post',
        middlewares: [isManagerPreHandler],
        handler: TenantController.create
    },
    {
        path: '/renewal',
        method: 'post',
        middlewares: [isManagerPreHandler],
        handler: TenantController.renewal
    },
    {
        path: '/',
        method: 'get',
        middlewares: [isSuperAdminPreHandler],
        handler: TenantController.getAll
    },
    {
        path: '/:id',
        method: 'get',
        middlewares: [isSuperAdminPreHandler],
        handler: TenantController.getOne
    },
    {
        path: '/:id',
        method: 'patch',
        middlewares: [isSuperAdminPreHandler],
        handler: TenantController.update
    },
    {
        path: '/:id',
        method: 'delete',
        middlewares: [isSuperAdminPreHandler],
        handler: TenantController.delete
    },
    {
        path: '/near-expired',
        method: 'get',
        middlewares: [isManagerPreHandler],
        handler: TenantController.getNearExpired
    }
];

tenantRoutes.forEach(route => tenantRouter[route.method](route.path, ...(route.middlewares || []), route.handler));

const managerRoutes: IRoute[] = [
    {
        path: '/',
        method: 'post',
        middlewares: [isSuperAdminPreHandler],
        handler: ManagerController.create
    },
    {
        path: '/',
        method: 'get',
        middlewares: [isSuperAdminPreHandler],
        handler: ManagerController.getAll
    },
    {
        path: '/:id',
        method: 'get',
        middlewares: [isSuperAdminPreHandler],
        handler: ManagerController.getOne
    },
    {
        path: '/:id',
        method: 'patch',
        middlewares: [isSuperAdminPreHandler],
        handler: ManagerController.update
    },
    {
        path: '/:id',
        method: 'delete',
        middlewares: [isSuperAdminPreHandler],
        handler: ManagerController.delete
    }
];
managerRoutes.forEach(route => managerRouter[route.method](route.path, ...(route.middlewares || []), route.handler));


const statisticsRoutes : IRoute[] = [
    {
        path: '/count',
        method: 'get',
        middlewares: [isManagerPreHandler],
        handler: StatisticsController.getCountStatistics
    }
];
statisticsRoutes.forEach(route => statisticsRouter[route.method](route.path, ...(route.middlewares || []), route.handler));

mainRouter.use('/company', companyRouter);
mainRouter.use('/package', packageRouter);
mainRouter.use('/tenant', tenantRouter);
mainRouter.use('/manager', managerRouter);
mainRouter.use('/statistics', statisticsRouter);


export default mainRouter;

