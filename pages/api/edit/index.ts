import { NextApiRequest, NextApiResponse } from 'next'

const SUPPORT_FLAGS = ['nsfw', 'noComment']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { flags: flagsRaw, content, title } = req.body

  const flags = String(flagsRaw).split(',').filter((flag) => SUPPORT_FLAGS.includes(flag))

  const resp = await fetch('http://localhost:8080/novels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers.authorization
    },
    body: JSON.stringify({ flags, content, title })
  })

  res
    .status(resp.status)
    .json({ ...await resp.json() })
}
