insert into users
    (first_name, last_name, user_name, email, password)
VALUES
    ('David', 'Quinith', 'DQ@DQ.com', 'Colombia123!'),
    ('Jonathan', 'Joestar', 'JoJo@bizadv.com', 'Hamon18'),
    ('Sterling', 'Archer', 'SecretAgent#1@archer.com', 'Phrasing?')

    create table users (
    id serial PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(50),
    user_name VARCHAR(50),
    email VARCHAR(200),
    password VARCHAR(500)
);

create table savedGames (
    id serial PRIMARY KEY,
    state text,
    user_id INTEGER REFERENCES users(id)
);