const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { getUser } = require("../../../utils/user");

const path = require("path");
const dbPath = path.join(process.cwd(), "db/user.db");

export default async function (req, res) {
    if (req.method !== "GET") return res.json({ message: "Error" });
    await sqlite
        .open({ filename: dbPath, driver: sqlite3.Database })
        .then((db) => db.all(`SELECT * FROM POST`))
        .then((posts) => {
            if (!posts) return res.json([]);
            res.json(posts);
        })
        .catch((err) => {
            res.json({ message: "err" });
        });
}
