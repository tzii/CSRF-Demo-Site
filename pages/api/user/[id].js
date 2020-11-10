const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

export default function (req, res) {
    if (req.method !== "GET") return res.json({ message: "Error" });
    if (!req.cookies.id)
        return res.json({ message: "You don't have permission" });
    sqlite
        .open({ filename: "user.db", driver: sqlite3.Database })
        .then((db) =>
            db.get(
                `SELECT * FROM USER WHERE id=${req.query.id} and EXISTS (SELECT * FROM USER WHERE id=${req.cookies.id})`
            )
        )
        .then((data) => {
            if (!data)
                return res.json({ message: "You don't have permission" });
            res.json({ name: data.name });
        })
        .catch((err) => {
            res.json({ message: err });
        });
}
