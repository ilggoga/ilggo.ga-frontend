import { NovelStruct } from '../types/index'
import { Converter } from 'showdown'
import moment from 'moment'
import xss from 'xss'

interface Props {
  novel: NovelStruct
}

export default function NovelViewer ({ novel }: Props) {
  const renderer = new Converter({
    ghCompatibleHeaderId: true,
    prefixHeaderId: 'ct-',
    headerLevelStart: 2,
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    literalMidWordUnderscores: false,
    strikethrough: true,
    tables: true,
    ghCodeBlocks: true,
    tasklists: true,
    ghMentions: true,
    ghMentionsLink: '/user/{u}',
    simpleLineBreaks: true
  })

  const flags = novel.Flags.split(',')
  if (!flags.includes('xss')) {
    novel.Content = xss(novel.Content)
  }

  return (
    <div>
      <h1>{novel.Title || '무제'} <span className="text-muted">#{novel.ID}</span></h1>
      <p>By {novel.Author} | {novel.CreatedAt} | 추천수: {novel.Likes.split(',').length}</p>
      <hr/>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderer.makeHtml(novel.Content) }}></div>
    </div>
  )
}
