import express from 'express';

import { all } from '../controllers/items.controller'

const router = express.Router()

// returns simple details of the account
router.get('/', function (req, res, next) {
  try {
    const value = all(req, res)
    res.send(JSON.stringify(value));
  } catch {
    console.log("bad")
  }
}
);

export default router