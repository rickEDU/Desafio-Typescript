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
const insertUser = `
INSERT INTO ${tableUsers}(id, username, email, first_name, last_name, is_admin, password )
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
// Objeto com todas as constantes.
export const query = {
    getUsers,
    getUser,
    insertUser,
    updateUser,
};
