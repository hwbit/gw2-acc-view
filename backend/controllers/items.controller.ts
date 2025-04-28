import { Request, Response } from 'express'
import { mockService } from '../services/mock.service'

export const all = async (req: Request, res: Response) => {
  try {
    const info = await mockService(req)

    return res.status(200).send({ message: 'Ok' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Something went wrong' })
  }
}

