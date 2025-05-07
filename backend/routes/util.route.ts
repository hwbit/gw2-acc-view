import express from 'express';

import { all, currencies, items, updateItems } from '../controllers/util.controller'

const router = express.Router()

// returns simple details of the utilities
router.get('/', async function (req, res, next) {
  try {
    await all(req, res)

    res.status(200);
  } catch {
    console.log("Error in util")
  }
}
);

router.get('/currencies', async function (req, res, next) {
  try {
    await currencies(req, res)

    res.status(200);
  } catch {
    console.log("Error in util")
  }
}
);

router.get('/items', async function (req, res, next) {
  try {
    await items(req, res)

    res.status(200);
  } catch {
    console.log("Error in util")
  }
}
);


router.get('/items/update', async function (req, res, next) {
  try {
    await updateItems(req, res)

    res.status(200);
  } catch {
    console.log("Error in util")
  }
}
);


export default router