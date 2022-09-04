import { Response } from 'express';

import Therapist from './therapist';

import TherapistsRepository from './therapists-repository';
let repository = new TherapistsRepository();

class TherapistsService {
  async udpateTherapistById(
    id: string,
    therapist: Therapist,
    res: Response
  ): Promise<boolean> {
    const { name, method, crp, phone } = therapist;

    console.info(`THERAPISTS -> PATCH | Updating therapist ${name}`);

    try {
      const values = [name, method, crp, phone];

      const result = await repository.updateById(id, values);

      if (result.command != 'UPDATE')
        throw Error(
          "Couldn't save therapist to database, please try again latter!"
        );

      console.info(`THERAPISTS -> PATCH | Succesfully updated!`);
      return true;
    } catch (error) {
      console.error(`THERAPISTS -> PATCH | Failed updating!`);

      console.debug(error);
      res.status(400).send(error);

      return false;
    }
  }

  async getTherapistById(id: string, res: Response): Promise<Therapist | null> {
    console.info(`THERAPISTS -> GET | Finding therapist by id ${id}`);

    try {
      let { rows } = await repository.getById(id);

      console.info(rows);
      console.info(`THERAPISTS -> GET | Succesfully fetched!`);

      return rows[0];
    } catch (error) {
      console.error(`THERAPISTS -> GET | Failed fetching!`);

      return null;
    }
  }

  /**
   *
   * @param therapist {@link Therapist} professional data to create
   * @param res {@link Response} response to return to user
   * @returns {@link Promise<boolean>} returns a promise that resolves true for success or false in error
   */
  async createTherapist(therapist: Therapist, res: Response): Promise<boolean> {
    const { name, email, password, method, crp, phone } = therapist;
    // TODO validate mandatory creation params

    console.info(`THERAPISTS -> POST | Creating therapist ${name}`);

    try {
      const values = [name, email, password, method, crp, phone];

      let result = await repository.create(values);

      if (result.command != 'INSERT')
        throw Error(
          "Couldn't save therapist to database, please try again latter!"
        );

      console.info(`THERAPISTS -> POST | Succesfully created!`);
      return true;
    } catch (error) {
      console.error(`THERAPISTS -> POST | Failed creating!`);

      console.debug(error);
      res.status(400).send(error);

      return false;
    }
  }
}

export default TherapistsService;
