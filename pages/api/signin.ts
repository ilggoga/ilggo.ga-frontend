import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { passwd, id, display, captcha } = req.body

  if (process.env.hcaptcha) {
    const captchaResp = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `response=${captcha}&secret=${process.env.HCAPTCHA_KEY}`
    }).then((res) => res.json())
    
    if (!captchaResp.success) {
      res
        .status(400)
        .json({ success: false, message: '캡챠를 확인해 주세요', code: 1001 })
      return
    }
  }

  const resp = await fetch('http://localhost:8080/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ passwd, id, display })
  })

  res
    .status(resp.status)
    .json({ ...await resp.json() })
}
