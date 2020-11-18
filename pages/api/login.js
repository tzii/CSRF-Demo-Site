const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const cookie = require("cookie");

const path = require("path");
const dbPath = path.resolve(__dirname, "./db/user.db");

export default async function (req, res) {
    if (req.method !== "POST") return res.json({ message: "Error" });
    await sqlite
        .open({ filename: dbPath, driver: sqlite3.Database })
        .then((db) =>
            db.get(
                `SELECT * FROM USER WHERE username="${req.body.username}" and password="${req.body.password}"`
            )
        )
        .then((data) => {
            if (!data) return res.json({ message: "Login failed" });
            res.setHeader("Set-Cookie", cookie.serialize("id", data.id));
            res.json({ message: "Loggin successfully" });
        });
}
