SELECT p.*,  u.username, u.profile_pic FROM post p
JOIN users u ON u.user_id = p.author_id
WHERE CASE WHEN $1 = false Then u.user_id != $2 ELSE true END
AND LOWER (p.title) LIKE LOWER('%' || $3 || '%');