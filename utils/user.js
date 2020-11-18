const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const dbPath = path.resolve(__dirname, "./db/user.db");

export const getUser = (id) => {
    return sqlite
        .open({ filename: dbPath, driver: sqlite3.Database })
        .then((db) => db.get(`SELECT * FROM USER WHERE id=${id}`));
};
