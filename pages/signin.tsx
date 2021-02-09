import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Hcaptcha from '@hcaptcha/react-hcaptcha'
import { Container, Form } from 'react-bootstrap'


export default function Login() {
  const router = useRouter()
  const [id, setID] = useState('')
  const [passwd, setPasswd] = useState('')
  const [display, setDisplay] = useState('')
  const [captcha, setCaptcha] = useState('')

  async function handleSubmit (event) {
    event.preventDefault()

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, passwd, display, captcha
      })
    }).then((res) => res.json())

    if (!res.success) {
      alert(`회원가입에 실패하였습니다\n${res.message} (${res.code})`)
      return
    }

    alert('회원가입에 성공하였습니다')
    router.push('/')
  }

  function setState (stateFn) {
    return function (event) {
      stateFn(event.target.value)
    }
  }

  function onCaptcha (key) {
    setCaptcha(key)
  }

  return (
    <div>
      <Head>
        <title>회원가입 - ilggo.ga</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Control onChange={setState(setID)} placeholder="아이디"/>
          <Form.Control onChange={setState(setDisplay)} placeholder="닉네임"/>
          <Form.Control type="password" onChange={setState(setPasswd)} placeholder="비번"/>
          <Hcaptcha sitekey="00c04b61-96ed-4501-b877-3648d3d328c0" onVerify={onCaptcha}/>
          <Form.Control type="submit" value="제출"/>
        </Form>
      </Container>
    </div>
  )
}
