import { Request, Response } from 'express';
import { getAccountBank, getAccountCache, cleanAccountCache, getAccountCharacters, getAccountInfo, getAccountMaterials, getAccountSharedInventory, getAccountWallet, getCharacterInventory } from '../services/acc.service';
import { getCurrencies } from '../services/util.service';

export const all = async (req: Request, res: Response) => {
  try {
    const info = await getAccountCache(req);
    const curatedInfo = cleanAccountCache(info);

    return res.status(200).send(curatedInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const accountInfo = await getAccountInfo(req);
    const accountBank = await getAccountBank(req);
    const accountMaterials = await getAccountMaterials(req);
    const accountSharedInventory = await getAccountSharedInventory(req);
    const accountWallet = await getAccountWallet(req);
    const accountCharacters = await getAccountCharacters(req);
    // const characterInventory = await getCharacterInventory(req, accountCharacters);

    const currencies = await getCurrencies(req);

    const info = await getAccountCache(req);
    const curatedInfo = cleanAccountCache(info);

    return res.status(200).send(curatedInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}