import { DataSource } from "typeorm";
import config from "@/config/env";



export const AppDataSource = new DataSource({
  type: config.DB_TYPE ||"postgres",
  host: config.DB_HOST || "localhost",
  port: config.DB_PORT || 5432,
  username: config.DB_USER || "admin",
  password: config.DB_PASSWORD || "admin",
  database: config.DB_DATABASE || "matiestate",
  entities: ["src/entities/*.ts"],
  logging: config.DB_ALLOW_LOGGING,
  synchronize: config.NODE_ENV !== 'production',
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
