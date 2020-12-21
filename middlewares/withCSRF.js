import Tokens from "csrf";

const withCSRF = (handler) => (req, res) => {
  if (!req.session.secret) return res.json({ status: "err", msg: "misconfigured csrf" });
  if (!new Tokens().verify(req.session.secret, req.body._csrf))
    return res.json({ status: "err", msg: "invalid csrf token" });
  handler(req, res);
};

export default withCSRF;
