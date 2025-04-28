import { writeToFile } from "../util/fileWrite"
import { createReqDetails } from "../util/api"

const baseAccountUrl = "https://api.guildwars2.com/v2/account"
const accountCharacterUrl = "https://api.guildwars2.com/v2/characters"
const inventory = "/inventory" // shared inventory
const bank = "/bank"
const materials = "/materials"
const wallet = "/wallet"


const ACCOUNT_INFO = "account_info.json"
const ACCOUNT_BANK = "account_bank.json"
const ACCOUNT_MATERIAL = "account_material.json"
const ACCOUNT_SHARED_INVENTORY = "account_shared_inventory.json"
const ACCOUNT_WALLET = "account_wallet.json"
const ACCOUNT_CHARACTERS = "account_characters.json"

/**
 * 
 * @param req 
 * @returns 
 */
export const getAccountInfo = async (req: any): Promise<any> => {
  const { key } = req.query

  const reqDetails = createReqDetails(key)
  const accountInfo = await fetch(baseAccountUrl, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountInfo, null, 4);

  await writeToFile("./data", ACCOUNT_INFO, data)

  return accountInfo
}

/**
 * 
 * @param req 
 * @returns 
 */
export const getAccountBank = async (req: any): Promise<any> => {
  const { key } = req.query

  const reqDetails = createReqDetails(key)
  const accountBank = await fetch(baseAccountUrl + bank, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountBank, null, 4);

  await writeToFile("./data", ACCOUNT_BANK, data)

  return accountBank
}

/**
 * 
 * @param req 
 * @returns 
 * 
 * calls API:2/account/inventory
 */
export const getAccountSharedInventory = async (req: any): Promise<any> => {
  const { key } = req.query

  const reqDetails = createReqDetails(key)
  const accountSharedInventory = await fetch(baseAccountUrl + inventory, reqDetails).then((response) => response.json());
  const data = JSON.stringify(accountSharedInventory, null, 4);

  await writeToFile("./data", ACCOUNT_SHARED_INVENTORY, data)
  return accountSharedInventory
}

