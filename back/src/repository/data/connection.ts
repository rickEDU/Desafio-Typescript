import pool from "../../pool/index.js";

console.log(process.env.USERPG, "connection");
export async function connectDb(
  query: string,
  arrayColumns: Array<string | number>
  ) {
    const client = await pool.connect();
    
  try {
    await client.query("BEGIN");

    const result = await client.query(query, arrayColumns);

    await client.query("COMMIT");
    client.release();
    return result.rows;
  } catch (error) {
    await client.query("ROLLBACK");
    client.release();
    throw error;
  }
}
