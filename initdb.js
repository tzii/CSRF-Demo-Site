const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function setup() {
    sqlite
        .open({
            filename: "./db/user.db",
            driver: sqlite3.Database,
        })
        .then((db) => {
            db.migrate({
                migrationsPath: "./migrations",
            });
        })
        .then(console.log);
}

setup();
