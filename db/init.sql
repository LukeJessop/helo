CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

ALTER TABLE users
ALTER password 
SET DATA TYPE TEXT;

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    img TEXT NOT NULL, 
    content TEXT NOT NULL,
    author_id INT REFERENCES users (user_id)
);