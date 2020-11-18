const cookie = require("cookie");

const path = require("path");
const dbPath = path.resolve(__dirname, "./db/user.db");

export default function (req, res) {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("id", "", { expires: new Date(2000, 1, 1) })
    );
    res.json({ message: "Logout successfully" });
}
