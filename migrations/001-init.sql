CREATE TABLE USER(
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    name TEXT
);

CREATE TABLE POST(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId Integer,
    content TEXT
);

INSERT INTO USER(id,username,password,name) VALUES (1,"user1","1","Vu");
INSERT INTO USER(id,username,password,name) VALUES (2,"user2","1","Tri");
INSERT INTO USER(id,username,password,name) VALUES (3,"user3","1","Vinh");
INSERT INTO USER(id,username,password,name) VALUES (4,"user4","1","Truong");
