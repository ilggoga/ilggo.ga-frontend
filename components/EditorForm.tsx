import { useState } from 'react'
import NovelEditor from './NovelEditor'
import { NovelStruct } from '../types'
import { Form } from 'react-bootstrap'
import { useRouter } from 'next/router'

interface Props {
  novel?: NovelStruct
  creation?: boolean
}

export default function EditorForm ({ novel, creation = false }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(novel?.Title || '')
  const [flags, setFlags] = useState(novel?.Flags || '')
  const [content, setContent] = useState(novel?.Content || '')

  function setState (stateFn) {
    return function (event) {
      stateFn(event.target.value)
    }
  }

  async function handleSubmit (event) {
    event.preventDefault()

    const url =
      creation
        ? '/api/edit'
        : '/api/edit/' + novel.ID

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        title, flags, content
      })
    }).then((res) => res.json())

    if (!res.success) {
      alert(`업로드에 실패하였습니다\n${res.message} (${res.code})`)
      return
    }

    const id = creation ? res.id : novel.ID
    router.push('/novel/' + id)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control value={title} onChange={setState(setTitle)} type="text" placeholder="제목을 입력하세요"/>
      <NovelEditor value={content} setValue={setContent}/>
      <Form.Control value={flags} onChange={setState(setFlags)} type="text" placeholder="Flag 리스트 (나중에 체크박스로 변경할 예정)"/>
      <Form.Control type="submit" value="제출"/>
    </Form>
  )
}
