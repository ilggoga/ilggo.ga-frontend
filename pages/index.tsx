import Head from 'next/head'
import { Alert, Container, Button } from 'react-bootstrap'
import NovelStats from '../components/NovelStats'
import Link from 'next/link'
import { NovelStruct } from '../types/index'

interface Props {
  novels?: NovelStruct[],
  success: boolean,
  error: string
}

export default function Home({ novels, success, error }: Props) {
  const novelStats =
    success
      ? <NovelStats novels={novels} />
      : <Alert variant="danger">소설 목록을 불러오지 못했습니다.<br /><code>{error}</code></Alert> 

  return (
    <div>
      <Head>
        <title>ilggo.ga - 온라인 소설 투고 사이트</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Container>
        <Alert variant="warning">
          읽고가 프로토타입입니다 <code>/pages/</code>에서 수정을 시작하세요
        </Alert>

        {novelStats}

        <Link href="/edit/">
          <Button variant="primary">새 글쓰기</Button>
        </Link>
      </Container>
    </div>
  )
}

export async function getServerSideProps()  {
  const { code, success, data: novels, message } = await fetch('http://localhost:8080/novels').then((res) => res.json())

  return {
    props: {
      novels,
      success,
      error: `${message} (${code})`
    }
  }
}
