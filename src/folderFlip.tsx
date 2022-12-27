import React, {
  useCallback,
  useReducer,
  useMemo,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  ReactElement
} from 'react'
import useIntersection from './useIntersection'
import CONSTANTS, { REDUCER_TYPE, SECTION_STATE } from './constants'
import FolderFlipReducer from './FolderFlipReducer'

const { windowSize } = CONSTANTS

type Props = {
  Steps: Array<{
    header: string | ReactElement
    content?: string | ReactElement
  }>
}

const FolderFlip = ({ Steps }: Props) => {
  const stepLength = Steps.length

  // define a window here, which indicates the folders showing in the screen
  const elementRef = useRef<HTMLElement | null>(null)

  // save all the content elements
  const [contentElements, setContentElements] = useState<
    HTMLCollectionOf<Element> | undefined
  >()

  const [tagHeight, setTagHeight] = useState<number | undefined>(0)

  // save the edge and showup elements, it should be stable
  const edgeElements = useMemo(
    () =>
      contentElements
        ? [].slice.call(contentElements, windowSize - 1, stepLength)
        : [],
    [contentElements, stepLength]
  )

  const showupElements = useMemo(
    () =>
      contentElements
        ? [].slice.call(contentElements, windowSize - 1, stepLength)
        : [],
    [contentElements, stepLength]
  )

  const [{ windowStart, sectionState }, dispatchFunc] = useReducer(
    FolderFlipReducer,
    {
      windowStart: 0,
      edgeIndex: windowSize - 1,
      showupIndex: windowSize,
      // save all the states of edge and showup elements in the array and
      // get their states update whenever observers are triggered
      edgeStates: [],
      showupStates: [],
      // define the state of the whole section, value can be sticky, float
      sectionState: SECTION_STATE.STICKY,
      // if change, send dispatch to run reducer again
      stepLength
    }
  )

  // the callback function to handle when the folder reaches edge with scrolling down
  // keep updating the state according to observers no matter if the element's state is used
  const reachEdgeFunc = useCallback(
    ([entry]: IntersectionObserverEntry[], index: number) =>
      dispatchFunc({
        type: REDUCER_TYPE.EDGE,
        payload: {
          index,
          value: entry.isIntersecting || entry.boundingClientRect.top < 0
        }
      }),
    [dispatchFunc]
  )

  const folderShowUpFunc = useCallback(
    ([entry]: IntersectionObserverEntry[], index: number) =>
      dispatchFunc({
        type: REDUCER_TYPE.SHOWUP,
        payload: { index, value: entry.isIntersecting }
      }),
    [dispatchFunc]
  )

  // set up the observer for edge element with threshold 100%
  useIntersection(edgeElements, reachEdgeFunc, 1)

  // set up the observer for showup element with threshold 0%
  useIntersection(showupElements, folderShowUpFunc, 0)

  // initial the content elements
  useEffect(() => {
    setContentElements(
      elementRef.current?.getElementsByClassName('FolderFlip-Content')
    )
    // set the height of the tag dynamically
    const tagElement =
      elementRef.current?.getElementsByClassName('FolderFlip-Tag')[0]
    setTagHeight(tagElement?.getBoundingClientRect().height)
  }, [Steps])

  const getTagContentStyles = (idx: number) => {
    let tagStyle: CSSProperties = {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none'
    }

    let contentStyle: CSSProperties = {
      position: 'sticky',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }

    if (isInWindow(idx, windowStart) && tagHeight) {
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

  const isInWindow = (idx: number, start: number) =>
    idx >= start && idx < start + windowSize

  return (
    <section className='FolderFlip' ref={elementRef}>
      {Steps.map((step, idx: number) => {
        const { header, content } = step
        const id = 'FolderFlipStep' + idx
        const { tagStyle, contentStyle } = getTagContentStyles(idx)

        return (
          <React.Fragment key={'FolderFlipStep_' + idx}>
            <div id={id} />
            <a href={'#' + id} className='FolderFlip-Tag' style={tagStyle}>
              {header ?? ''}
            </a>
            <div
              className='FolderFlip-Content'
              style={{
                ...contentStyle,
                height: `calc(100vh - ${windowSize * (tagHeight ?? 1)}px)`
              }}
            >
              {content ?? ''}
            </div>
          </React.Fragment>
        )
      })}
    </section>
  )
}

export default FolderFlip

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

//     &-Content {
//       position: sticky;
//       display: flex;
//       flex-direction: column;
//       align-items: center;

//       &-Title {
//         padding-top: 10px;
//         text-align: center;
//         font-family: Fann-Grotesque-Black-Pro;
//         font-size: 40px;
//         font-weight: 900;
//       }

//       &-Container {
//         padding-top: 40px;
//         display: flex;
//         flex-direction: column;
//         justify-content: start;
//         align-items: center;
//         gap: 34px;

//         @media (min-width: ${md}) {
//           align-items: start;
//           justify-content: center;
//         }

//         @media (min-width: ${lg}) {
//           max-width: 944px;
//           flex-direction: row;
//           align-items: start;
//           padding-top: 64px;
//           gap: 48px;
//         }

//         @media (min-width: ${xl}) {
//           max-width: 1068px;
//           justify-content: center;
//         }

//         img {
//           border-radius: 8px;
//           object-fit: cover;
//           @media (max-width: ${md}) {
//             width: 335px;
//             height: 224px;
//           }

//           @media (min-width: ${md}) {
//             width: 728px;
//             height: 334px;
//             align-self: center;
//           }

//           @media (min-width: ${lg}) {
//             width: 486px;
//             height: 334px;
//           }
//         }

//         div {
//           @media (min-width: ${lg}) {
//             padding: 0;
//             padding-top: 54px;
//           }
//           @media (min-width: ${md}) and (max-width: ${lg}) {
//             max-width: 648px;
//           }
//         }

//         button:last-child {
//           ${buttons.ButtonStyle}
//           ${buttons.ButtonColorFunc('#000')}
//         }
//       }
//     }
//   }
// `
