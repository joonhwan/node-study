import connectPgSimple from "connect-pg-simple";
import dotenv from "dotenv";

dotenv.config();

export function CreateSessionStore(session: typeof import("express-session")) {

  const PgSessionStore = connectPgSimple(session);
  
  const env = process.env;
  const conObject = {
    user: env.DBUSER,
    password: env.DBPASS,
    host: env.DBHOST,
    port: Number(env.DBPORT),
    database: env.DBNAME,
  };
  console.log(conObject);

  return new PgSessionStore({
    conObject
  });
}
