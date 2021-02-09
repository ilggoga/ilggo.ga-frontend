import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { passwd, id } = req.body

  const resp = await fetch('http://localhost:8080/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ passwd, id })
  })

  res
    .status(resp.status)
    .json({ ...await resp.json() })
}
