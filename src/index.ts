import app from './app';
import { initializeDatabase } from './config/db.config';
import config from './config/env';
import { BuildingsController } from './controllers/buildings.controller';
import { container } from './di/di.config';
// import { container, initializeContainer } from './di/di.config';
import { DI_TYPES } from './di/di.types';
import { logger } from './utils/logger';

const port = config.PORT || 3000;

const startServer = async () => {
 
try {
    // await initializeContainer();
    await initializeDatabase();

    const buildingsController = container.get<BuildingsController>(DI_TYPES.BuildingsController);
    // await Promise.all([initializeContainer(), initializeDatabase()]);

    logger.info(`buildings controller ${buildingsController}`)
    
    // if (container.isBound(DI_TYPES.BuildingsController)) {
    //   logger.error('BuildingsController not bound in container');
    //   // throw new Error('BuildingsController not bound in container');
    // }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  
} catch (error) {
  logger.error('Error starting server:', error); 
}};

// app.listen(port, async () => {
//   await Promise.all([initializeDatabase(), initializeContainer()]);
//   console.log(`Server running on port ${port}`);
// });

startServer();

