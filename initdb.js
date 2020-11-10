const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function setup() {
    sqlite
        .open({
            filename: "user.db",
            driver: sqlite3.Database,
        })
        .then((db) =>
            db.get("SELECT * FROM USER WHERE username='user1' AND password='1'")
        )
        .then(console.log);
    // await db.migrate({
    //     migrationsPath: "./migrations",
    // });
    // const users = await db.get(
    //     "SELECT * FROM USER WHERE username='user1' AND password='1'"
    // );
    // console.log(users);
}

setup();
