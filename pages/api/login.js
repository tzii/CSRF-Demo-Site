import withMiddleware from "../../middlewares/withMiddleware";

const handler = function (req, res) {
  if (req.method === "POST") {
    if (req.session.user) return res.json({ status: "err", msg: "already logged" });
    req.db
      .collection("users")
      .findOne(req.body)
      .then((user) => {
        if (!user) {
          return res.send({ status: "err", msg: "Wrong username or password" });
        }
        req.session.user = { id: user._id, name: user.name };
        res.json({ status: "ok", msg: "ok" });
      });
  } else res.json({ status: "err", msg: `Can't ${req.method}` });
};

export default withMiddleware(handler);
