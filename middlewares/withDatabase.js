import { MongoClient } from "mongodb";
import { mongodb_uri } from "../config";

const client = new MongoClient(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true });

const withDatabase = (handler) => (req, res) => {
  if (!client.isConnected()) {
    return client.connect().then(() => {
      req.db = client.db("csrf");
      return handler(req, res);
    });
  }
  req.db = client.db("csrf");
  return handler(req, res);
};
export default withDatabase;
