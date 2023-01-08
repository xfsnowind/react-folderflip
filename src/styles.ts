// import styled from 'styled-components'
import { CSSProperties } from 'react'
import { SECTION_STATE } from './constants'

// const FolderFlipStyles = styled.section`
//   counter-reset: section;
//   .FolderFlip {
//     &-Tag {
//       display: inline-block;
//       width: 100%;
//       border-radius: 16px 16px 0 0;
//       display: flex;
//       padding-top: 40px;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       text-decoration: none;

//       &-Number {
//         &:before {
//           counter-increment: section;
//           content: counter(section);
//           font-family: Fann-Grotesque-Light-Pro;
//           font-weight: 300;
//           font-size: 40px;
//           line-height: 100%;
//         }
//       }
//     }
//   }
// `

type styleProp = {
  idx: number,
  windowSize: number,
  windowStart: number,
  sectionState: SECTION_STATE.FLOAT | SECTION_STATE.STICKY,
  tagHeight?: number,
}

export const getTagContentStyles = ({idx, tagHeight, windowSize, windowStart, sectionState}: styleProp) => {
  const tagStyle: CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none'
  }

  const contentStyle: CSSProperties = {
    position: 'sticky',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  if (isInWindow(idx, windowStart, windowSize) && tagHeight) {
    tagStyle.top = `${(idx - windowStart) * tagHeight}px`
    tagStyle.bottom = `${(windowStart + windowSize - 1 - idx) * tagHeight}px`
    tagStyle.marginTop = `${(idx - windowStart) * tagHeight}px`

    if (sectionState === SECTION_STATE.STICKY) {
      tagStyle.position = 'sticky'
      contentStyle.top = `${(idx + 1 - windowStart) * tagHeight}px`
    } else {
      tagStyle.position = 'relative'
      tagStyle.transform = `translateY(calc(${
        (windowSize + windowStart - 1 - idx) * 100
      }vh - ${tagHeight * (windowSize + windowStart - idx)}px))`

      if (idx !== windowSize + windowStart - 1)
        contentStyle.transform = `translateY(calc(${
          (windowSize + windowStart - 1 - idx) * 100
        }vh - ${
          tagHeight * (windowSize + windowStart - idx - idx + windowStart)
        }px))`
    }
  }

  if (idx === windowSize + windowStart - 1 && tagHeight) {
    if (sectionState === SECTION_STATE.STICKY) {
      contentStyle.position = 'sticky'
    } else {
      contentStyle.position = 'relative'
      contentStyle.top = '0px'
      tagStyle.transform = `translateY(calc(${
        (windowSize + windowStart - 1 - idx) * 100
      }vh - ${tagHeight * (windowSize + windowStart - idx + 1)}px))`
    }
  }

  return { tagStyle, contentStyle }
}

const isInWindow = (idx: number, start: number, windowSize: number) =>
  idx >= start && idx < start + windowSize

// export default FolderFlipStyles
