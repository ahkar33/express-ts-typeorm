import "module-alias/register";
import { register } from "tsconfig-paths";

register({
	baseUrl: __dirname,
	paths: {
		"@/*": ["./*"],
	},
});

import express, { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { DataSource } from "typeorm";
import { handleJSONParsingError } from "@/utils";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(handleJSONParsingError);

const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
});

AppDataSource.initialize()
	.then(async () => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
