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
          <tr>
            <td>{novel.ID}</td>
            <td>{novel.Title || '무제'}</td>
            <td>{novel.Author}</td>
            <td>{novel.Likes.split(',').length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
