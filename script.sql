CREATE DATABASE repertorio ;

\c repertorio;

CREATE TABLE canciones 
(id SERIAL,
titulo VARCHAR(50),
artista 
VARCHAR(50),
tono VARCHAR(10)
);

\dt 

\d canciones;