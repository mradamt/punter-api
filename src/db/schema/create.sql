-- Drop tables in reverse order
DROP TABLE IF EXISTS users_posts_reactions CASCADE;
DROP TABLE IF EXISTS reaction_types CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS prompts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- CREATE TABLEs in order of least dependent to most dependent
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username varchar(3) NOT NULL ,
  password varchar(30) NOT NULL
);

CREATE TABLE prompts (
  id SERIAL PRIMARY KEY NOT NULL,
  text varchar(255) NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  prompt_id INTEGER REFERENCES prompts(id) ON DELETE CASCADE,
  text varchar(255) NOT NULL,
  creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE reaction_types (
  id SERIAL PRIMARY KEY NOT NULL,
  index INTEGER NOT NULL DEFAULT 0,
  label VARCHAR(20) NOT NULL,
  icon VARCHAR(255) NOT NULL,
);

CREATE TABLE users_posts_reactions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  reaction_type_id INTEGER REFERENCES reaction_types(id) ON DELETE CASCADE
)
