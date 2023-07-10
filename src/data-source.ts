import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const AppDataSourceConfig = (): DataSourceOptions => {
  const patchEntities: string = path.join(__dirname, "./entities/*.{ts,js}");
  const patchMigrations: string = path.join(
    __dirname,
    "./migrations/*.{ts,js}"
  );

  const nodeEnv: string = process.env.NODE_ENV || "";

  if (nodeEnv == "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [patchEntities],
      migrations: [patchMigrations],
    };
  }

  return {
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    database: process.env.PGDATABASE,
    username: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    synchronize: false,
    logging: true,
    entities: [patchEntities],
    migrations: [patchMigrations],
  };
};

export const AppDataSource = new DataSource(AppDataSourceConfig());
