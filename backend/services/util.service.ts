import { writeToFile } from "../util/fileWrite";
import { createReqDetails } from "../util/api";
import { Request, Response } from 'express';
import fs from 'fs';

import { CURRENCIES_URL, ITEMS_URL, TOKENINFO_URL, CURRENCIES, ACCOUNT_WALLET, ACCOUNT_BANK, ACCOUNT_SHARED_INVENTORY, ACCOUNT_MATERIAL, ALL_INVENTORY, MAX_ITEM_QUERY_SIZE } from "../util/constants";

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
  const accountWallet = fs.readFileSync("./data/" + ACCOUNT_WALLET + ".json", "utf-8");
  const walletArr = JSON.parse(accountWallet);

  const currencies = fs.readFileSync("./data/" + CURRENCIES + ".json", "utf-8");
  const currenciesArr = JSON.parse(currencies);

  const merged = {};

  for (const item in walletArr) {
    const id = walletArr[item]["id"];
    merged[id] = {};
    merged[id]["value"] = walletArr[item]["value"];
  }

  for (const item in currenciesArr) {
    const id = currenciesArr[item]["id"];
    const name = currenciesArr[item]["name"];
    const icon = currenciesArr[item]["icon"];
    if (id in merged) {
      merged[id]["name"] = name;
      merged[id]["icon"] = icon;
    }
  }

  const data = JSON.stringify(merged, null, 4);

  await writeToFile("./data", "wallet_" + CURRENCIES + ".json", data);
  return merged;
}

// Item helpers

const getMaterial = async (req: any): Promise<any[]> => {
  const accountMaterials = fs.readFileSync("./data/" + ACCOUNT_MATERIAL + ".json", "utf-8");
  const accountMaterialsJson = JSON.parse(accountMaterials);
  const materialArray: any[] = []; // holds material list
  let materialList: number[] = [];

  // get the ids and break the list up into smaller pieces
  for (const index in accountMaterialsJson) {
    const numberIndex = Number(index);
    const id = accountMaterialsJson[index]["id"];
    materialList.push(id);

    if (numberIndex % MAX_ITEM_QUERY_SIZE == 0 || numberIndex == accountMaterialsJson.length-1) {
      materialArray.push(materialList);
      materialList = [];
    }
  }

  let materialResults: any[] = [];
  // call the api to get the list
  for (const index in materialArray) {
    const parameters = materialArray[index].join(",");
    const url = ITEMS_URL + parameters;
    const materialResponse = await fetch(url).then((response) => response.json());
    materialResults = materialResults.concat(materialResponse);
  }

  return materialResults;
}


const getSharedInventory = async (req: any): Promise<any[]> => {
  const accountSharedInventory = fs.readFileSync("./data/" + ACCOUNT_SHARED_INVENTORY + ".json", "utf-8");
  const accountSharedInventoryJson = JSON.parse(accountSharedInventory);
  const sharedInventoryList: any[] = [];

  // get the ids
  for (const index in accountSharedInventoryJson) {
    const item = accountSharedInventoryJson[index];
    if (item) {
      const id = item["id"];
      sharedInventoryList.push(id);
    }
  }

  // call the api to get the list
  // Note: shared inventory is a small list - no need to break it item smaller pieces
  const parameters = sharedInventoryList.join(",");
  const url = ITEMS_URL + parameters;
  const sharedInventoryResponse = await fetch(url).then((response) => response.json());

  return sharedInventoryResponse;
}


const getBank = async (req: any): Promise<any[]> => {
  const accountBank = fs.readFileSync("./data/" + ACCOUNT_BANK + ".json", "utf-8");
  const accountBankJson = JSON.parse(accountBank);
  const accountBankArray: any[] = []; // holds material list
  let accountBankList: number[] = [];

  // get the ids and break the list up into smaller pieces
  for (const index in accountBankJson) {
    const numberIndex = Number(index); // cast item
    const item = accountBankJson[index];
    if (item) {
      const id = item["id"];
      accountBankList.push(id);
    }
    if (numberIndex % MAX_ITEM_QUERY_SIZE == 0 || numberIndex == accountBankJson.length-1) {
      accountBankArray.push(accountBankList);
      accountBankList = [];
    }
  }

  let accountBankResults: any[] = [];
  // call the api to get the list
  for (const index in accountBankArray) {
    const parameters = accountBankArray[index].join(",");
    const url = ITEMS_URL + parameters;
    const accountBankResponse = await fetch(url).then((response) => response.json());
    accountBankResults = accountBankResults.concat(accountBankResponse);
  }

  return accountBankResults;
}


export const getSharedItems = async (req: any) => {
  const allInventory = fs.readFileSync("./data/" + ALL_INVENTORY + ".json", "utf-8");
  const allInventoryJson = JSON.parse(allInventory);
  return allInventoryJson;
}


export const updateSharedItems = async (req: any) => {
  const materialList = await getMaterial(req);
  const sharedInventoryList = await getSharedInventory(req);
  const bankList = await getBank(req);

  await createItemCache(materialList);
  await createItemCache(sharedInventoryList);
  await createItemCache(bankList);

  const mapBank = await mapItems(ACCOUNT_BANK);
  const mapSharedInventory = await mapItems(ACCOUNT_SHARED_INVENTORY);
  const mapMaterials = await mapItems(ACCOUNT_MATERIAL);

  const allInventory = {
    "account_bank": mapBank,
    "shared_inventory": mapSharedInventory,
    "materials": mapMaterials,
  };
  const allInventoryString = JSON.stringify(allInventory, null, 4);
  await writeToFile("./data", "all_inventory.json", allInventoryString);
}


const createItemCache = async (data: object[]) => {
  for (const index in data) {
    const item = data[index];
    const id = item["id"];
    const itemString = JSON.stringify(item, null, 4);
    const filePath = `./data/items/${id}.json`
    if (!fs.existsSync(filePath)) {
      await writeToFile("./data/items", `${id}.json`, itemString);
    }
  }
}


export const mapItems = async (data: string) => {
  const items = fs.readFileSync("./data/" + data + ".json", "utf-8");
  const itemsJson = JSON.parse(items);

  for (const index in itemsJson) {
    const item = itemsJson[index];
    
    if (item) {
      const id = item["id"];
      const filePath = `./data/items/${id}.json`;
      let name = "ItemName"; // placeholder - some items may not be in the API
      let icon = "NoIcon"; // placeholder
      if (fs.existsSync(filePath)) {
        const cachedItem = fs.readFileSync(filePath, "utf-8");
        const cachedItemJson = JSON.parse(cachedItem)
        name = cachedItemJson["name"];
        icon = cachedItemJson["icon"];
      }

      item["name"] = name;
      item["icon"] = icon;
    }
  }
  return itemsJson;
}