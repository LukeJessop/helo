CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL
);

ALTER TABLE users
ALTER password 
SET DATA TYPE TEXT;

