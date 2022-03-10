-- INSERT INTO table (columnA, columnB) VALUES ((val1a, val1b), (val2a, val2b))
INSERT INTO users (username, password) 
  VALUES
    ("ABC", "ABC"),
    ("DEF", "DEF");

INSERT INTO prompts (text) 
  VALUES
    ("If puns were given the respect they deserve");

INSERT INTO reaction_types (index, label, icon)
  VALUES
    (0, "hard no", "unamused-face_1f612.png"),
    (1, "meh", "yawning-face_1f971.png"),
    (2, "reluctant ha", "face-with-rolling-eyes_1f644.png"),
    (3, "genuine ha", "smiling-face-with-sunglasses_1f60e.png"),
    (4, "fave", "sports-medal_1f3c5.png");

