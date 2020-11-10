const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

export const getUser = (id) => {
    return sqlite
        .open({ filename: "user.db", driver: sqlite3.Database })
        .then((db) => db.get(`SELECT * FROM USER WHERE id=${id}`));
};
