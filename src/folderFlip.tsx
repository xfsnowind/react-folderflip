import React, {
  useCallback,
  useReducer,
  useMemo,
  useEffect,
  useRef,
  useState,
  ReactElement
} from 'react'
import useIntersection from './useIntersection'
import CONSTANTS, { REDUCER_TYPE, SECTION_STATE } from './constants'
import FolderFlipReducer from './folderFlipReducer'
import { getTagContentStyles } from './styles'

const { windowSize } = CONSTANTS

type Props = {
  Steps: Array<{
    header: ReactElement
    content: ReactElement
  }>
}

const FolderFlip = ({ Steps }: Props) => {
  if (!Array.isArray(Steps) || Steps.length < 2) {
    throw new Error('Steps should be an array and contain at least two items.')
  }

  const stepLength = Steps.length

  // define a window here, which indicates the folders showing in the screen
  const elementRef = useRef<HTMLElement | null>(null)

  // save all the content elements
  const [contentElements, setContentElements] = useState<
    HTMLCollectionOf<Element> | undefined
  >()

  const [tagHeight, setTagHeight] = useState<number | undefined>(0)

  // save the edge and showup elements, it should be stable
  const observedElements = useMemo(
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
  useIntersection(observedElements, reachEdgeFunc, 1)

  // set up the observer for showup element with threshold 0%
  useIntersection(observedElements, folderShowUpFunc, 0)

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

  return (
    <section className='FolderFlip' ref={elementRef}>
      {Steps.map((step, idx: number) => {
        const { header, content } = step
        const id = 'FolderFlipStep' + idx
        const { tagStyle, contentStyle } = getTagContentStyles({
          idx,
          tagHeight,
          windowSize,
          windowStart,
          sectionState
        })

        return (
          <React.Fragment key={'FolderFlipStep_' + idx}>
            <div id={id} />
            <a
              href={'#' + id}
              className='FolderFlip-Tag'
              style={tagStyle}
              data-testid='FolderFlip-Tag'
            >
              {header ?? ''}
            </a>
            <div
              className='FolderFlip-Content'
              data-testid='FolderFlip-Content'
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
