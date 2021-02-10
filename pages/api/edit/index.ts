import { NextApiRequest, NextApiResponse } from 'next'

const MINUTE_IN_MILLISECOND = 60 * 1000
const SUPPORT_FLAGS = ['nsfw', 'noComment']
const cooldown = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cooldown[req.headers.authorization || '']) {
    res
      .status(400)
      .json({ success: false, message: '알파 테스트에서는 한 계정당 1분의 글 작성 쿨타임을 사용합니다', code: 1002 })

    setTimeout(() => {
      cooldown[req.headers.authorization || ''] = false
    }, MINUTE_IN_MILLISECOND)
    return
  }

  cooldown[req.headers.authorization || ''] = true
  const { flags: flagsRaw, content, title } = req.body

  const flags = String(flagsRaw).split(',').filter((flag) => SUPPORT_FLAGS.includes(flag))

  const resp = await fetch('http://localhost:8080/novels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (req.headers.authorization || '')
    },
    body: JSON.stringify({ flags, content, title })
  })

  res
    .status(resp.status)
    .json({ ...await resp.json() })
}
