const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { getUser } = require("../../../utils/user");

export default async function (req, res) {
    if (req.method !== "GET") return res.json({ message: "Error" });
    if (!req.cookies.id)
        return res.json({ message: "You don't have permission 1" });
    await getUser(req.cookies.id)
        .then(async (user) => {
            if (!user)
                return res.json({ message: "You don't have permission" });
            await sqlite
                .open({ filename: "user.db", driver: sqlite3.Database })
                .then((db) => db.run(`DELETE FROM POST`))
                .then(() => res.json({ message: "Clear Successfully" }))
                .catch((err) => {
                    res.json({ message: "err" });
                });
        })
        .catch((err) => {
            res.jsos({ message: err });
        });
}
