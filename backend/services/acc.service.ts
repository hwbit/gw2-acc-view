import { writeToFile } from "../util/fileWrite";
import { createReqDetails } from "../util/api";
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BASE_ACCOUNT_URL, ACCOUNT_CHARACTER_URL, inventory, bank, materials, wallet, ACCOUNT_INFO, ACCOUNT_BANK, ACCOUNT_MATERIAL, ACCOUNT_SHARED_INVENTORY, ACCOUNT_WALLET, ACCOUNT_CHARACTERS, WALLET_CURRENCIES } from "../util/constants";

/**
 * Gets general details relating to the account
 * 
 * Calls API:2/account
 * 
 * @param req 
 * @returns 
 */
export const getAccountInfo = async (req: any): Promise<any> => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  const accountInfo = await fetch(BASE_ACCOUNT_URL, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountInfo, null, 4);

  await writeToFile("./data", ACCOUNT_INFO + ".json", data);

  return accountInfo;
}

/**
 * Gets all items in the account bank
 * 
 * API:2/account/bank
 * 
 * @param req 
 * @returns 
 */
export const getAccountBank = async (req: any): Promise<any> => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  const accountBank = await fetch(BASE_ACCOUNT_URL + bank, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountBank, null, 4);

  await writeToFile("./data", ACCOUNT_BANK + ".json", data);

  return accountBank;
}

/**
 * Gets all items in the shared inventory slots
 * 
 * Calls API:2/account/inventory
 * 
 * @param req 
 * @returns 
 */
export const getAccountSharedInventory = async (req: any): Promise<any> => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  const accountSharedInventory = await fetch(BASE_ACCOUNT_URL + inventory, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountSharedInventory, null, 4);

  await writeToFile("./data", ACCOUNT_SHARED_INVENTORY + ".json", data);
  return accountSharedInventory;
}

/**
 * Gets all materials in material storage
 * 
 * Calls API:2/account/materials
 * 
 * @param req 
 * @returns 
 */
export const getAccountMaterials = async (req: any): Promise<any> => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  const accountMaterials = await fetch(BASE_ACCOUNT_URL + materials, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountMaterials, null, 4);

  await writeToFile("./data", ACCOUNT_MATERIAL + ".json", data);
  return accountMaterials;
}

/**
 * Gets all currencies on the account
 * 
 * Calls API:2/account/wallet
 *  
 * @param req 
 * @returns json of wallet
 */
export const getAccountWallet = async (req: any): Promise<any> => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  const accountWallet = await fetch(BASE_ACCOUNT_URL + wallet, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountWallet, null, 4);

  await writeToFile("./data", ACCOUNT_WALLET + ".json", data);

  return accountWallet;
}

/**
 * Gets a list of characters from the GW2 API and write to file
 * 
 * Calls API:2/characters
 * 
 * @param req query request
 * @returns array of characters on the account
 */
export const getAccountCharacters = async (req: any): Promise<any> => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  const accountCharacters = await fetch(ACCOUNT_CHARACTER_URL, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountCharacters, null, 4);

  await writeToFile("./data", ACCOUNT_CHARACTERS + ".json", data);

  return accountCharacters;
}

/**
 * Gets character inventory from the GW2 API and write to file
 * 
 * Calls API:2/characters/:id/inventory
 * 
 * @param req query request
 * @param characters array of characters
 */
export const getCharacterInventory = async (req: any, characters: string[]) => {
  const { key } = req.query;

  const reqDetails = createReqDetails(key);
  let characterInventory: any, characterUrl: string | URL | Request, data: string;

  for (const character of characters) {
    characterUrl = `${ACCOUNT_CHARACTER_URL}/${character}${inventory}`;
    console.log(characterUrl);
    characterInventory = await fetch(characterUrl, reqDetails).then((response) => response.json());
    data = JSON.stringify(characterInventory, null, 4);

    console.log(characterInventory);

    await writeToFile("./data/characters", character + ".json", data);
  }
}

/**
 * Gets account details from the cache
 * 
 * info, wallet, characters, bank, shared inventory, mats
 * 
 * @param req 
 * @returns dictionary of account details
 */
export const getAccountCache = async (req: any): Promise<any> => {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename); // get the name of the directory

  const files = [ACCOUNT_INFO, ACCOUNT_CHARACTERS, ACCOUNT_BANK, ACCOUNT_SHARED_INVENTORY, ACCOUNT_MATERIAL, WALLET_CURRENCIES];
  const results: Record<string, any> = {};

  for (const file of files) {
    const filePath: string = path.join(__dirname, '..', 'data', file + ".json");

    try {
    const data = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    results[file] = jsonData;
    } catch (err) {
      results[file] = {};
    }
  }

  return results;
}

/**
 * Construct a response for the user account details stored locally.
 * 
 * @param info 
 * @returns 
 */
export const cleanAccountCache = (info: any) => {
  const name = info.account_info.name;
  const age = info.account_info.age;
  const characters = info.account_characters;
  const wallet = info.wallet_currencies;
  const account_bank = info.account_bank;
  const account_shared_inventory = info.account_shared_inventory;
  const account_material = info.account_material;
  let coin = 0;
  let karma = 0;
  
  for (const item in wallet) {
    const value = wallet[item].value;
    if ("Coin" == wallet[item].name) {
      coin = value;
    }
    if ("Karma" == wallet[item].name) {
      karma = value;
    }
  }

  return {
    name,
    age,
    characters,
    coin,
    karma,
    account_bank,
    account_shared_inventory,
    account_material
  }
}
