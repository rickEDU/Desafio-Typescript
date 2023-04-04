/* Table user */
const tableUsers = "usuario";
/* Columns */
// Column id;
// Column username;
// Column email;
// Column first_name;
// Column last_name;
// Column password;
// Column squad;
// Column is_admin;
const allCollumns = `id, username, email, first_name, last_name, squad, is_admin`;

/* Table team */
const tableTeams = "equipe";
// Column id;
// Column name;
// Column leader;

// Seleciona todas as informações da tabela
const getUsers = `
SELECT * FROM ${tableUsers};
`;

const getUser = `
SELECT *
FROM public.${tableUsers} 
WHERE username = $1
`;
const deleteUser = `
DELETE
FROM public.${tableUsers} 
WHERE id = $1
RETURNING ${allCollumns};
`;
const getUserById = `
SELECT ${allCollumns}
FROM public.${tableUsers} 
WHERE id = $1;
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
first_name = $4,
last_name = $5,
password = $6,
is_admin = $7
WHERE id = $1
RETURNING ${allCollumns};
`;

const leaderSquad = `
SELECT *
FROM ${tableTeams}
WHERE leader=$1
`;

const selectUserSquad = `
SELECT id
FROM ${tableUsers}
WHERE squad=$1;
`;
const getLogin = `
SELECT u.id, u.username, u.squad, u.is_admin, u.password, e.leader
FROM usuario u
LEFT JOIN equipe e
ON u.squad = e.id
WHERE username=$1
`;
const getUserLeader = `
SELECT u.id, u.username, u.email, u.first_name, u.last_name, u.squad, u.is_admin, e.leader
FROM usuario u
LEFT JOIN equipe e
ON u.squad = e.id
WHERE u.id=$1
`;
const updateUserSquad = `
UPDATE ${tableUsers}
SET squad = $2
WHERE id = $1
RETURNING ${allCollumns};
`;

const getAllUsers=`
SELECT * 
FROM public.${tableUsers}
`;

// Objeto com todas as constantes.
export const query = {
  getUsers,
  getUser,
  getUserById,
  deleteUser,
  insertUser,
  updateUser,
  leaderSquad,
  selectUserSquad,
  updateUserSquad,
  getLogin,
  getAllUsers,
  getUserLeader,
};
