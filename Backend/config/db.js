import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();    

const {PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE} = process.env;

//creats a sql connection using our environment variables and exports it for use in other files
const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require&channel_binding=require`;
export const sql = neon(connectionString);