-- INSERT INTO table (columnA, columnB) VALUES ((val1a, val1b), (val2a, val2b))
INSERT INTO users (username, password) 
  VALUES
    ('ABC', 'ABC'),
    ('DEF', 'DEF'),
    ('GHI', 'GHIMARK');

INSERT INTO prompts (text) 
  VALUES
    ('If puns were given the respect they deserve');

INSERT INTO reaction_types (index, label, icon)
  VALUES
    (0, 'hard no', 'unamused-face_1f612.png'),
    (1, 'meh', 'yawning-face_1f971.png'),
    (2, 'reluctant ha', 'face-with-rolling-eyes_1f644.png'),
    (3, 'genuine ha', 'smiling-face-with-sunglasses_1f60e.png'),
    (4, 'fave', 'sports-medal_1f3c5.png');

INSERT INTO posts (user_id, prompt_id, text, creation_date)
  VALUES
    (1, 1, 'We''d be riding really fun ebikes made by Wheeebikes', '2022-01-01 09:00:00-08'),
    (2, 1, 'We''d go to Totes Boats for all our boating needs', '2022-01-02 09:00:00-08');

INSERT INTO users_posts_reactions (user_id, post_id, reaction_type_id)
  VALUES
    (1, 1, 2),
    (1, 2, 2),
    (2, 1, 3),
    (2, 2, 3),
    (3, 1, 4),
    (3, 2, 4);
