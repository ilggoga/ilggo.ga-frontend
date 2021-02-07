import Head from 'next/head'
import { Alert, Container } from 'react-bootstrap'
import NovelTable from '../components/NovelTable'
import { NovelStruct } from '../types/index'

interface Props {
  novels?: NovelStruct[],
  success: boolean,
  error: string
}

export default function Home({ novels, success, error }: Props) {
  const novelUploadStatus =
    !success
      ? <Alert variant="danger">소설 목록을 불러오지 못했습니다.<br /><code>{error}</code></Alert>
      : (
        <div>
          <h4>최근 업로드된 소설 목록:</h4>
          <NovelTable novels={novels.sort((a, b) => b.ID - a.ID).slice(0, 10)}></NovelTable>

          <h4>인기 소설 목록:</h4>
          <NovelTable novels={novels.sort((a, b) => b.Likes.split(',').length - a.Likes.split(',').length)}></NovelTable>
        </div>
      )

  return (
    <div>
      <Head>
        <title>ilggo.ga - 온라인 소설 투고 사이트</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Container>
        <Alert variant="warning">
          읽고가 프로토타입입니다 <code>/pages/</code>에서 수정을 시작하세요
        </Alert>

        {novelUploadStatus}
      </Container>
    </div>
  )
}

export async function getStaticProps()  {
  const { code, success, data: novels, message } = await fetch('http://localhost:8080/novels').then((res) => res.json())

  return {
    props: {
      novels,
      success,
      error: `${message} (${code})`
    }
  }
}
