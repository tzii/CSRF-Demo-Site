const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { getUser } = require("../../../utils/user");

const path = require("path");
const dbPath = path.join(process.cwd(), "db/user.db");

export default async function (req, res) {
    if (req.method !== "GET") return res.json({ message: "Error" });
    if (!req.cookies.id) return res.json({ message: "You have not logged in" });
    await getUser(req.cookies.id)
        .then((user) => {
            if (!user) return res.json({ message: "You have not logged in" });
            res.json({ id: user.id, name: user.name });
        })
        .catch((err) => {
            res.json({ message: err });
        });
}
