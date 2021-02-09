import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Form } from 'react-bootstrap'


export default function Login() {
  const router = useRouter()
  const [id, setID] = useState('')
  const [passwd, setPasswd] = useState('')

  async function handleSubmit (event) {
    event.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id, passwd
      })
    }).then((res) => res.json())

    if (!res.success) {
      alert(`로그인에 실패하였습니다\n${res.message} (${res.code})`)
      return
    }

    window.localStorage.setItem('token', res.data)
    router.push('/')
  }

  function setState (stateFn) {
    return function (event) {
      stateFn(event.target.value)
    }
  }

  return (
    <div>
      <Head>
        <title>로그인 - ilggo.ga</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Control onChange={setState(setID)} placeholder="아이디"/>
          <Form.Control type="password" onChange={setState(setPasswd)} placeholder="비번"/>
          <Form.Control type="submit" value="제출"/>
        </Form>
      </Container>
    </div>
  )
}
