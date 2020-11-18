const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { getUser } = require("../../../utils/user");

const path = require("path");
const dbPath = path.resolve(__dirname, "./db/user.db");

export default async function (req, res) {
    if (req.method !== "GET") return res.json({ message: "Error" });
    console.log(req.query.content);
    if (!req.cookies.id)
        return res.json({ message: "You don't have permission 1" });
    await getUser(req.cookies.id)
        .then(async (user) => {
            if (!user)
                return res.json({ message: "You don't have permission" });
            await sqlite
                .open({ filename: dbPath, driver: sqlite3.Database })
                .then((db) =>
                    db.run(
                        `INSERT INTO POST(userId, content) VALUES (${user.id},"${req.query.content}")`
                    )
                )
                .then(() => {
                    res.end();
                })
                .catch((err) => {
                    res.json({ message: "err 1", err });
                });
        })
        .catch((err) => {
            res.jsos({ message: err });
        });
}
