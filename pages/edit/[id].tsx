
import Head from 'next/head'
import { Alert, Container } from 'react-bootstrap'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { NovelStruct } from '../../types'
import EditorForm from '../../components/EditorForm'

interface Props {
  id: string,
  novel?: NovelStruct,
  success: boolean,
  error: string
}

export default function NovelEdit ({ id, novel, success, error }: Props) {
  const novelViewer =
    success
      ? <EditorForm novel={novel} />
      : <Alert variant="danger">소설 정보를 불러오지 못했습니다.<br /><code>{error}</code></Alert>

  return (
    <div>
      <Head>
        <title>소설 편집기 #{id} - ilggo.ga</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Container>
        {novelViewer}
      </Container>
    </div>
  );
}

export async function getServerSideProps(req)  {
  const { id } = req.query

  if (Array.isArray(id)) return
  if (Number.isNaN(parseInt(id))) return

  const { code, success, data: novel, message }
    = await fetch('http://localhost:8080/novels/' + id).then((res) => res.json())

  return {
    props: {
      novel: novel || {},
      success,
      id,
      error: `${message} (${code})`
    }
  }
}
