import Link from 'next/link'
import { Button } from 'react-bootstrap'
import useSWR from 'swr'
import { useRouter } from 'next/router'

export default function HomeToolbar () {
  const router = useRouter()

  function onLogout () {
    window.localStorage.removeItem('token')
    window.location.reload()
  }

  function authFetch (url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem('token') || ''
      }
    }).then(res => res.json())
  }

  const { data } = useSWR('/api/auth', authFetch)

  if (!data) return <div>로그인 정보를 불러오는 중입니다...</div>
  if (data.success) {
    return (
      <div>
        <Link href="/edit"><Button>새로 만들기</Button></Link> |&nbsp;
        {data.data.Display.String}({data.data.ID})로 로그인 하였습니다.&nbsp;
        <a onClick={onLogout}>로그아웃</a>
      </div>
    )
  }

  return (
    <div>
      <Link href="/signin"><Button>회원가입</Button></Link> or &nbsp;
      <Link href="/login"><Button variant="secondary">로그인</Button></Link>
    </div>
  )
}
