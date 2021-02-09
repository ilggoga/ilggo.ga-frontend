import Link from 'next/link'
import { Table } from "react-bootstrap"
import { NovelStruct } from "../types"

interface Props {
  novels: NovelStruct[]
}

export default function NovelTable ({ novels }: Props) {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>제목</th>
          <th>투고자</th>
          <th>추천 수</th>
        </tr>
      </thead>
      <tbody>
        { novels.map((novel) => (
          <tr className="novel-table-row">
            <td>{novel.ID}</td>
            <td><Link href={'/novel/' + novel.ID}>{novel.Title || '무제'}</Link></td>
            <td><Link href={'/user/' + novel.Author}>{novel.Author}</Link></td>
            <td>{novel.Likes.split(',').length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
