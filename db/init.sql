CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

ALTER TABLE users
ALTER password 
SET DATA TYPE TEXT;

