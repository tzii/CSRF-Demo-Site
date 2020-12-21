import withAuthentication from "../../../middlewares/withAuthentication";
import withCSRF from "../../../middlewares/withCSRF";

const handler = function (req, res) {
  if (req.method === "POST") {
    if (!req.body.content) return res.status(200).json({ status: "err", msg: "no content" });
    req.db
      .collection("posts")
      .insertOne({ userId: req.session.user.id, content: req.body.content }, { forceServerObjectId: true })
      .then((result) => {
        if (!result.insertedCount) return res.status(200).json({ status: "ok", msg: "posted unsuccessful" });
        return res.status(200).json({ status: "ok", msg: "posted successful" });
      });
  } else res.status(200).json({ status: "err", msg: `Can't ${req.method}` });
};

export default withAuthentication(withCSRF(handler));
