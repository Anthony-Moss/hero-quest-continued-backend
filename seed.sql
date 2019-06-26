create table users (
    id serial PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(50),
    email VARCHAR(200),
    password VARCHAR(500)
);

create table savedGames (
    id serial PRIMARY KEY,
    state text,
    user_id INTEGER REFERENCES users(id)
);