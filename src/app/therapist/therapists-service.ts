import { Response } from 'express';

import Therapist from './therapist';

import TherapistsRepository from './therapists-repository';
let repository = new TherapistsRepository();

class TherapistsService {
  /**
   *
   * @param email {@link string} user email to query on database
   * @param password {@link string} user password to validate access
   * @param res {@link Reponse} response to return to user
   * @returns {@link Promise<boolean>} returns a promise that resolves to
   * userAuthenticated {@link {email: string, name: string, id_therapist: string}}
   * in success or null in error
   */
  async getTherapistByEmail(
    email: string,
    password: string,
    res: Response
  ): Promise<Therapist | null> {
    console.info(`THERAPISTS -> POST | Finding therapist by email ${email}`);

    try {
      let { rows } = await repository.getByEmail(email);

      console.info(rows);
      console.info(`THERAPISTS -> POST | Authenticating!`);

      const { passw, method, crp, phone, ...userAuthenticated } = rows[0];

      if (passw == password) {
        console.info(`THERAPISTS -> POST | Authenticated!`);
        return userAuthenticated;
      }

      throw new Error('Invalid credentials!');
    } catch (error) {
      console.error(`THERAPISTS -> POST | Failed authenticating!`);
      console.debug(error);

      res.status(400).send({ message: 'Falha de autenticação', error: error });

      return null;
    }
  }

  /**
   *
   * @param id {@link string} therapist Id to query database
   * @param therapist {@link Therapist} professional data to update
   * @param res {@link Response} response to return to user
   * @returns {@link Promise<boolean>} returns a promise that resolves true for success or false in error
   */
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

  /**
   *
   * @param id {@link string} therapist Id to query database
   * @param res {@link Response} response to return to user
   * @returns {@link Promise<boolean>} returns a promise that resolves to
   * therapist {@link Therapist} in success or null in error
   */
  async getTherapistById(id: string, res: Response): Promise<Therapist | null> {
    console.info(`THERAPISTS -> GET | Finding therapist by id ${id}`);

    try {
      let { rows } = await repository.getById(id);

      console.info(rows);
      console.info(`THERAPISTS -> GET | Succesfully fetched!`);

      const { passw, ...therapist } = rows[0];

      return therapist;
    } catch (error) {
      console.error(`THERAPISTS -> GET | Failed fetching!`);
      res.status(400).send(error);

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
