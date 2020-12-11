import withMiddleware from "./withMiddleware";

const withAuthentication = (handler) =>
  withMiddleware((req, res) => {
    if (!req.session.user) return res.json({ status: "err", msg: "not logged in" });
    return handler(req, res);
  });

export default withAuthentication;
