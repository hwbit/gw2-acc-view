import express from 'express';

import { all, update } from '../controllers/acc.controller'

const router = express.Router()

// returns simple details of the account
router.get('/', async function (req, res, next) {
  try {
    await all(req, res)

    res.status(200);
  } catch {
    console.log("Error in acc")
  }
}
);

// update all aspects of the account, including characters and inventory
// returns only a message
router.get('/update', async function (req, res, next) {
  try {
    await update(req, res);

    res.status(200);
  } catch {
    console.log("Error in acc/update");
  }
}
);

export default router