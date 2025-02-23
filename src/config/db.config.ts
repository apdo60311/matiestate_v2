import { DataSource, DataSourceOptions } from "typeorm";
import config from "./env";
import { logger } from "../utils/logger";
import { glob } from "glob";
import path from "path";

export class DatabaseConfig {
  private static instance: DatabaseConfig;
  private dataSource?: DataSource;

  private constructor() {}

  static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }

  private getEntityPaths = async (): Promise<string[]> => {
    try {
      const isDevelopment = config.NODE_ENV !== "development";
      const rootDir = process.cwd();
      
      const entityPath = isDevelopment
        ? path.join(rootDir, "src/entities/*.entity.ts")
        : path.join(rootDir, "dist/entities/*.entity.js");

      logger.info(entityPath) 
      return await glob(entityPath);
    } catch (error) {
      logger.error(`Error while getting entity paths: ${error}`);
      return [];
    }
  };

  private createDataSourceOptions = async (): Promise<DataSourceOptions> =>{
    const entityPaths = await this.getEntityPaths();
    logger.info(`Found ${entityPaths.length} entities`);
    logger.info(`Entities: ${JSON.stringify(entityPaths)}`);

    return {
        type: config.DB_TYPE || "postgres",
        host: config.DB_HOST || "localhost",
        port: config.DB_PORT || 5432,
        username: config.DB_USER || "admin",
        password: config.DB_PASSWORD || "admin",
        database: config.DB_DATABASE || "matiestate",
        entities: entityPaths,
        logging: config.DB_ALLOW_LOGGING,
        synchronize: config.NODE_ENV !== "production",
      };
  }

  async getDataSource(): Promise<DataSource> {
    if (!this.dataSource) {
      const options = await this.createDataSourceOptions();
      this.dataSource = new DataSource(options);
    }
    return this.dataSource;
  }

  async initialize(): Promise<DataSource> {
    try {
      const dataSource = await this.getDataSource();
      await dataSource.initialize();

      const tables = await this.dataSource!.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
      );
      logger.info(
        `Database initialized with tables: ${(tables || []).length}`
      );
  
      return dataSource;
    } catch (error) {
      logger.error('Failed to initialize database connection:', error);
      throw error;
    }
  }
}

export const initializeDatabase = async () => {
  const dbService = DatabaseConfig.getInstance();
  return await dbService.initialize();
};
