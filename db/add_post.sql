INSERT INTO post (title, img, content)
VALUES ($1, $2, $3)
RETURNING *;