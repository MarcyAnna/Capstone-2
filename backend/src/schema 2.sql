CREATE TABLE users (
 id VARCHAR(50) PRIMARY KEY,
 first_name TEXT NOT NULL,
 last_name TEXT NOT NULL,
 email VARCHAR(256),
 DOB INT NOT NULL,
 comments TEXT
);

CREATE TABLE users_conditions (
user_id TEXT
REFERENCES users ON DELETE CASCADE,
condition_id INTEGER
REFERENCES conditions ON DELETE CASCADE,
PRIMARY KEY (user_id, condition_id)
);


CREATE TABLE conditions (
 id INTEGER PRIMARY KEY,
 name TEXT NOT NULL,
 Description TEXT NOT NULL,
 Comments TEXT
);

 
 CREATE TABLE symptom_log (
 date DATE PRIMARY KEY,
 user_id TEXT
 REFERENCES users,
 symptom_id INTEGER
 REFERENCES symptoms,
 severity INTEGER NOT NULL
);


CREATE TABLE symptoms (
 id INTEGER PRIMARY KEY,
 name TEXT NOT NULL,
 description TEXT NOT NULL
);
