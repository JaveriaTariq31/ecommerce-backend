import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "jm_6y/",
    database: "userdb",
    synchronize: true,  
    entities: [User],
});