import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const resp = await fetch('http://localhost:8080/auth', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (req.headers.authorization || '')
    }
  })

  res
    .status(resp.status)
    .json({ ...await resp.json() })
}
