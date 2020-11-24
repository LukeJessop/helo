UPDATE post
SET title = $2, img = $3, content = $4
WHERE post_id = $1;