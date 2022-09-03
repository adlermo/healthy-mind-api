import { Request, Response } from 'express';
import pool from '../../database/postgres-connector';

import TherapistsService from './therapists-service';
import Therapist from './therapist';
const service = new TherapistsService();

class TherapistsController {
  public async updateById(req: Request, res: Response) {
    const { id } = req.params;

    let result = await service.udpateTherapistById(id, req.body, res);

    if (result) return res.send();
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    let result = await service.getTherapistById(id, res);

    if (result) return res.send(result);
  }

  public async getAll(req: Request, res: Response) {
    console.info(`THERAPISTS -> GET  | Fetching therapists list`);

    try {
      const client = await pool.connect();

      const sql = 'SELECT * FROM therapists';
      const { rows } = await client.query(sql);

      const therapists = rows;

      client.release();

      res.send(therapists);

      console.info(`THERAPISTS -> GET  | Succesfully fetched!`);
    } catch (error) {
      console.error(`THERAPISTS -> GET  | Failed fetching!`);
      res.status(400).send(error);
    }
  }

  public async create(req: Request<Therapist>, res: Response<Therapist>) {
    let result = await service.createTherapist(req.body, res);

    if (result) {
      return res.status(201).send();
    }
  }
}

export default TherapistsController;
