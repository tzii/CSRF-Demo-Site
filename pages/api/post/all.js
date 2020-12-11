import { ObjectID } from "mongodb";
import withAuthentication from "../../../middlewares/withAuthentication";

const handler = function (req, res) {
  if (req.method === "GET") {
    req.db
      .collection("posts")
      .find({}, { sort: { _id: -1 }, projection: { userId: 1, content: 1 } })
      .toArray()
      .then(res.json);
  } else res.json({ status: "err", msg: `Can't ${req.method}` });
};

export default withAuthentication(handler);
