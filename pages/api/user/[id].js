import { ObjectID } from "mongodb";
import withAuthentication from "../../../middlewares/withAuthentication";

const handler = function (req, res) {
  if (req.method === "GET") {
    req.db
      .collection("users")
      .findOne({ _id: ObjectID(req.query.id) }, { projection: { _id: 1, name: 1 } })
      .then((user) => {
        if (user) return res.json(user);
        return res.json({
          status: "err",
          msg: "No user found",
        });
      });
  } else res.json({ status: "err", msg: `Can't ${req.method}` });
};

export default withAuthentication(handler);
