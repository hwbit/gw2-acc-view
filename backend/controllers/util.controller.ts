import { Request, Response } from 'express';
import { updateSharedItems, mapCurrencies, getSharedItems } from '../services/util.service';
import { createDataFolders } from '../util/createDataFolders';

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
    const info = await getSharedItems(req)

    return res.status(200).send(info);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}


export const updateItems = async (req: Request, res: Response) => {
  try {
    await createDataFolders()
    const info = updateSharedItems(req);

    return res.status(200).send(info);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}