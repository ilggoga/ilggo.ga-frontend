import { Dispatch, SetStateAction, useState } from 'react'
import ReactMde from 'react-mde'
import { Converter } from 'showdown'
import xss from 'xss'

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

interface Props {
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

export default function NovelEditor ({ value, setValue }: Props) {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')
  
  return (
    <ReactMde
      l18n={{ write: '편집기', preview: '미리보기', uploadingImage: '', pasteDropSelect: '' }}
      value={value}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(xss(renderer.makeHtml(markdown)))
      }
    />
  )
}
