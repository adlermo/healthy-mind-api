import pool from '../../database/postgres-connector';

class TherapistsRepository {
  async create(values: Array<string>) {
    const sql = `INSERT INTO therapists(id_therapist, name, method, crp, phone) VALUES(nextval('therapists_sequence'),$1,$2,$3,$4);`;
    const client = await pool.connect();

    let result = await client.query(sql, values);
    client.release();

    return result;
  }

  async getById(id: string) {
    const sql = `SELECT * FROM therapists WHERE id_therapist = $1;`;
    const client = await pool.connect();

    let result = await client.query(sql, [id]);
    client.release();

    return result;
  }

  async updateById(id: string, values: Array<string>) {
    values.unshift(id);

    const sql = `UPDATE therapists SET name = $2, method = $3, crp = $4, phone = $5 WHERE id_therapist = $1;`;
    const client = await pool.connect();

    let result = await client.query(sql, values);
    client.release();

    return result;
  }
}

export default TherapistsRepository;
