import withAuthentication from "../../../middlewares/withAuthentication";
import withMiddleware from "../../../middlewares/withMiddleware";

const handler = function (req, res) {
  if (req.method === "GET") {
    res.json(req.session.user);
  } else res.json({ status: "err", msg: `Can't ${req.method}` });
};

export default withAuthentication(handler);
