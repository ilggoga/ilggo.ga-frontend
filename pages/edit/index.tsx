import Head from 'next/head'
import { Container } from 'react-bootstrap'
import 'react-mde/lib/styles/css/react-mde-all.css'
import EditorForm from '../../components/EditorForm'


export default function NovelEdit () {
  return (
    <div>
      <Head>
        <title>소설 편집기 (새로 만들기) - ilggo.ga</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Container>
        <EditorForm creation/>
      </Container>
    </div>
  );
}
