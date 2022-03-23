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

INSERT INTO posts (creation_date, user_id, prompt_id, spicy_language, text)
  VALUES
    ('2022-01-31 09:00:00-08', 1, 1, FALSE, 'We could be having a lot of fun on ebikes made by Wheeebikes'),
    ('2022-01-25 09:00:00-08', 2, 1, FALSE, 'And we were shopping for a boat, where better than Totes Boats?'),
    ('2022-01-20 09:00:00-08', 3, 1, FALSE, 'If McDonald''s ran out of soft serve again we could just go to Mockdonalds'),
    ('2022-01-12 09:00:00-08', 1, 1, FALSE, 'The agency helping the unemployed re-enter the workforce would be called Resume'),
    ('2022-01-09 09:00:00-08', 2, 1, FALSE, 'The agency helping unemployed Canadians re-enter the workforce would be called Resume Eh? '),
    ('2022-01-08 10:00:00-08', 3, 1, FALSE, 'Sheep shearing services would be provided by Ewe Beauty'),
    ('2022-01-08 09:00:00-08', 1, 1, FALSE, 'Rogain would be lead sponsor of the Joe Rogain Podcast'),
    ('2022-01-07 09:00:00-08', 2, 1, TRUE, 'When we needed a male dog for breeding we''d contact Bitch Please'),
    ('2022-01-06 09:00:00-08', 3, 1, FALSE, 'We''d be treating itchy mosquito bites with balm called Itch? Please.'),
    ('2022-01-05 14:00:00-08', 1, 1, FALSE, 'We''d cure dry eyes using Moist Your Eyes'),
    ('2022-01-04 13:00:00-08', 2, 1, FALSE, 'We''d buy reclaimed wood from tRecycled or Forest Re-Products'),
    ('2022-01-04 12:00:00-08', 3, 1, FALSE, 'We''d buy custom doors from D''Your Way'),
    ('2022-01-02 11:00:00-08', 1, 1, FALSE, 'We''d buy fancy custom doors from Dior Ways'),
    ('2022-01-02 10:00:00-08', 2, 1, FALSE, 'Ladies could shop skincare products from Moisturize Her'),
    ('2022-01-01 09:00:00-08', 3, 1, FALSE, 'German men could shop skincare products from Moisturize Herre');

INSERT INTO users_posts_reactions (user_id, post_id, reaction_type_id)
  VALUES
    (1, 1, 1),
    (1, 2, 1),
    (1, 3, 1),
    (2, 1, 1),
    (2, 2, 2),
    (2, 3, 3),
    (3, 1, 3),
    (3, 2, 3),
    (3, 3, 3);
