/* Team table */
const teamTable = "equipe";
const allCollumns = `id, name, leader`;

// Seleciona todas as informações da tabela
const getTeams = `
SELECT * FROM ${teamTable};
`;

const getTeam = `
SELECT * FROM ${teamTable}
WHERE id= $1;
`;

const getLeader = `
SELECT *
FROM ${teamTable} 
WHERE leader=$1;
`;

const deleteTeam = `
DELETE
FROM public.${teamTable} 
WHERE id = $1
RETURNING ${allCollumns};
`;
const getUser = `
SELECT *
FROM public.usuario
WHERE id=$1;
`;

const insertTeam = `
INSERT INTO ${teamTable}(${allCollumns})
VALUES (gen_random_uuid(),$1, $2)
RETURNING ${allCollumns};
`;

const updateTeam = `
UPDATE ${teamTable}
SET name = $2,
leader = $3,
WHERE id = $1
RETURNING *;
`;

const updateUserSquad = `
UPDATE usuario
SET squad = $1
WHERE id = $2
RETURNING *;
`;

const teamTeste = `
SELECT *
FROM usuario
INNER JOIN equipe
ON usuario.squad = equipe.id;`;
// Objeto com todas as constantes.
export const teamQuery = {
  getTeams,
  getTeam,
  getLeader,
  deleteTeam,
  insertTeam,
  updateTeam,
  getUser,
  updateUserSquad,
};
