import { Request, Response } from 'express';
import { getCurrencies, mapCurrencies, getItems, mapItems } from '../services/util.service';


export const all = async (req: Request, res: Response) => {
  try {
    const info = mapCurrencies(req);

    return res.status(200).send(info);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}


export const currencies = async (req: Request, res: Response) => {
  try {
    const info = mapCurrencies(req);

    return res.status(200).send(info);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}

export const items = async (req: Request, res: Response) => {
  try {
    const info = getItems(req);
    // mapItems(req);

    return res.status(200).send(info);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}