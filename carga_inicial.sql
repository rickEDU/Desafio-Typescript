CREATE TABLE public.Usuario (
	id UUID NOT NULL,
	username TEXT NOT NULL UNIQUE,
	email TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	password TEXT NOT NULL,
	squad UUID,
	is_admin BOOLEAN NOT NULL,
	CONSTRAINT Usuario_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.Equipe (
	id UUID NOT NULL,
	name TEXT NOT NULL UNIQUE,
	leader UUID NOT NULL,
	CONSTRAINT Equipe_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

ALTER TABLE Usuario ADD CONSTRAINT Usuario_fk0 FOREIGN KEY (squad) REFERENCES Equipe(id);

ALTER TABLE Equipe ADD CONSTRAINT Equipe_fk0 FOREIGN KEY (leader) REFERENCES Usuario(id);



-- Carga inicial:
-- senha 'alpha1234'
INSERT INTO usuario (id, username, email, first_name, last_name, password, is_admin)
VALUES (gen_random_uuid(),'usuario1', 'username@gmail.com', 'nome', 'Last_Name', '$2b$10$1gQVQ3E/loxRBB5ARKXvmeOBhtKgWnUzsHxXxvR3QEyAM7KVo1BtC', true ),
(gen_random_uuid(),'usuario2', 'username@gmail.com', 'nome2', 'Last_Name2', '$2b$10$1gQVQ3E/loxRBB5ARKXvmeOBhtKgWnUzsHxXxvR3QEyAM7KVo1BtC', true );


