import withAuthentication from "../../../middlewares/withAuthentication";

const handler = function (req, res) {
  if (req.method === "GET") {
    req.db
      .collection("posts")
      .drop()
      .then((d) => {
        console.log(d);
        return res.json({ status: "ok", msg: "clear successful" });
      });
  } else res.json({ status: "err", msg: `Can't ${req.method}` });
};

export default withAuthentication(handler);
