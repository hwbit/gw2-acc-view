import { writeToFile } from "../util/fileWrite";
import { createReqDetails } from "../util/api";
import { Request, Response } from 'express';
import fs from 'fs';

const CURRENCIES_URL = "https://api.guildwars2.com/v2/currencies?ids=all";
const TOKENINFO_URL = "https://api.guildwars2.com/v2/tokeninfo";

const CURRENCIES = "currencies";
const ACCOUNT_WALLET = "account_wallet";

/**
 * Checks input is a valide API token.
 * 
 * Calls API:2/tokeninfo
 * 
 * @param req 
 * @returns 
 */
export const confirmToken = async (req: any): Promise<any> => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  const tokenResults = await fetch(TOKENINFO_URL, reqDetails).then((response) => response.json());
  
  return !('text' in tokenResults);
}

/**
 * Gets all the currencies in the game.
 * 
 * Calls API:2/currencies
 * 
 * @param req 
 * @returns 
 */
export const getCurrencies = async (req: any): Promise<any> => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  const currenciesInfo = await fetch(CURRENCIES_URL, reqDetails).then((response) => response.json());
  const data = JSON.stringify(currenciesInfo, null, 4);

  await writeToFile("./data", CURRENCIES + ".json", data);

  return currenciesInfo;
}


/**
 * Maps wallet currencies with general currencies info. Combines to give context to values in the wallet.
 * 
 * @param req 
 * @returns 
 */
export const mapCurrencies = async (req: any) => {

  const account_wallet = fs.readFileSync("./data/"+ACCOUNT_WALLET+".json", "utf-8");
  const wallet_arr = JSON.parse(account_wallet);

  const currencies = fs.readFileSync("./data/"+CURRENCIES+".json", "utf-8");
  const currencies_arr = JSON.parse(currencies);

  // map for fast lookup
  const map2 = new Map(wallet_arr.map(obj => [obj.id, obj]));

  // filter and merge
  const merged = currencies_arr
    .filter(obj => map2.has(obj.id))
    .map(obj => ({
      ...obj,
      ...map2.get(obj.id)!
    }));


  await writeToFile("./data", "wallet_" + CURRENCIES + ".json", merged);

  return merged;
}
