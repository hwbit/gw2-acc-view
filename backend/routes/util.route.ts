import express from 'express';

import { all } from '../controllers/util.controller'

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


export default router