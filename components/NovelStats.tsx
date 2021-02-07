import NovelTable from './NovelTable'
import { NovelStruct } from '../types/index'

interface Props {
  novels: NovelStruct[]
}

export default function NovelStats ({ novels }: Props) {
  const recentNovels = novels.sort((a, b) => b.ID - a.ID).slice(0, 10)
  const popularNovels = novels.sort((a, b) => b.Likes.split(',').length - a.Likes.split(',').length)

  return (
    <div>
      <h4>최근 업로드된 소설 목록:</h4>
      <NovelTable novels={recentNovels}></NovelTable>

      <h4>인기 소설 목록:</h4>
      <NovelTable novels={popularNovels}></NovelTable>
    </div>
  )
}
