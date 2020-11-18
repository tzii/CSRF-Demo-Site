const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { getUser } = require("../../../utils/user");

const path = require("path");
const dbPath = path.resolve(__dirname, "./db/user.db");

export default async function (req, res) {
    if (req.method !== "GET") return res.json({ message: "Error" });
    if (!req.cookies.id)
        return res.json({ message: "You don't have permission" });
    await getUser(req.cookies.id)
        .then(async (user) => {
            if (!user)
                return res.json({ message: "You don't have permission" });
            await sqlite
                .open({ filename: dbPath, driver: sqlite3.Database })
                .then((db) =>
                    db.get(
                        `SELECT * FROM USER WHERE id=${req.query.id} and EXISTS (SELECT * FROM USER WHERE id=${req.cookies.id})`
                    )
                )
                .then((user) => {
                    if (!user) return res.json({ message: "don't have user" });
                    res.json(user);
                })
                .catch((err) => {
                    res.json({ message: "err" });
                });
        })
        .catch((err) => {
            res.json({ message: err });
        });
}
