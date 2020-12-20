import withAuthentication from "../../middlewares/withAuthentication";

const handler = function (req, res) {
  if (req.method === "GET") {
    req.session.destroy().then(res.json({ status: "ok", msg: "logout successful" }));
  } else res.json({ status: "err", msg: `Can't ${req.method}` });
};

export default withAuthentication(handler);
