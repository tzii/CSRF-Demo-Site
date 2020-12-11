import { expressSession, withSession } from "next-session";
import connectMongo from "connect-mongo";
import { mongodb_uri } from "../config";

const MongoStore = connectMongo(expressSession);

const withSession1 = (handler) =>
  withSession(handler, {
    store: new MongoStore({ url: mongodb_uri, dbName: "csrf" }),
  });

export default withSession1;
