/* Table user */
const tableUsers = "usuario";
/* Columns */
// const columnId = "id";
// const columnName = "username";
// const columnEmail = "email";
// const columnPassword = "password";
// const columnFirstName= "first_name";
// const columnLastName= "last_name";
// const columnIsAdmin = "is_admin";
const allCollumns = `id, username, email, first_name, last_name, is_admin`;

/* Table team */

// Seleciona todas as informações da tabela
const getUsers = `
SELECT * FROM ${tableUsers};
`;

const getUser = `
SELECT *
FROM public.${tableUsers} 
WHERE username = $1;
`;
const deleteUser = `
DELETE
FROM public.${tableUsers} 
WHERE id = $1
RETURNING ${allCollumns};
`;

const insertUser = `
INSERT INTO ${tableUsers}(id, username, email, first_name, last_name, password, is_admin )
VALUES (gen_random_uuid(),$1, $2, $3, $4, $5, $6)
RETURNING ${allCollumns};
`;

const updateUser = `
UPDATE ${tableUsers}
SET username = $2,
email = $3,
    password = $4
WHERE id = $1
RETURNING *;
`;


const leaderSquad = `
SELECT *
FROM equipe
WHERE leader=$1
`
// Objeto com todas as constantes.
export const query = {
  getUsers,
  getUser,
  deleteUser,
  insertUser,
  updateUser,
  leaderSquad,
};
