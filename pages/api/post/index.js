import withAuthentication from "../../../middlewares/withAuthentication";

const handler = function (req, res) {
  if (req.method === "POST") {
    if (!req.body.content) return res.json({ status: "err", msg: "no content" });
    req.db
      .collection("posts")
      .insertOne({ userId: req.session.user.id, content: req.body.content }, { forceServerObjectId: true })
      .then((result) => {
        if (!result.insertedCount) return res.json({ status: "ok", msg: "posted unsuccessful" });
        return res.json({ status: "ok", msg: "posted successful" });
      });
  } else res.json({ status: "err", msg: `Can't ${req.method}` });
};

export default withAuthentication(handler);
