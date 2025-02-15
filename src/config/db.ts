// import { DataSource } from "typeorm";
// import config from "./env";
// import { logger } from "../utils/logger";
// import { glob } from "glob";
// import path from "path";

// const getEntityPaths = async (): Promise<string[]> => {
//   try {
//     const isDevelopment = config.NODE_ENV !== "development";
//     const rootDir = process.cwd();
    
//     const entityPath = isDevelopment
//       ? path.join(rootDir, "src/entities/*.entity.ts")
//       : path.join(rootDir, "dist/entities/*.entity.js");



//     logger.info(entityPath) 
//     return await glob(entityPath);
//   } catch (error) {
//     logger.error(`Error while getting entity paths: ${error}`);
//     return [];
//   }
// };

// const initializeDataSource = async () => {
//   const entityPaths = await getEntityPaths();

//   logger.info(`Initializing DataSource with ${entityPaths.length} entities`);

//   const AppDataSource = new DataSource({
//     type: config.DB_TYPE || "postgres",
//     host: config.DB_HOST || "localhost",
//     port: config.DB_PORT || 5432,
//     username: config.DB_USER || "admin",
//     password: config.DB_PASSWORD || "admin",
//     database: config.DB_DATABASE || "matiestate",
//     entities: entityPaths,
//     logging: config.DB_ALLOW_LOGGING,
//     synchronize: config.NODE_ENV !== "production",
//   });

//   return AppDataSource;
// };

// export const init_db = async () => {
//   try {
//     const AppDataSource = await initializeDataSource();
//     await AppDataSource.initialize();
//     const tables = await AppDataSource.query(
//       "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
//     );
//     logger.info(
//       `Database initialized with tables: ${(tables || []).length}`
//     );
//   } catch (error) {
//     logger.error(`Error during Data Source initialization: ${error}`);
//   }
// };
