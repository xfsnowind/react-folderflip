import CONSTANTS, { REDUCER_TYPE, SECTION_STATE } from './constants'

const { windowSize } = CONSTANTS

// edge element is the upper element which would be checked if it reaches threshold 100%
// showup element is the lower element which would be checked if it reaches threshold 0

// According to the state machine diagram, there are three types of states:
// 1. the normal state, it's normally stable
// 2. the state triggered by user scroll behavior
// 3. the state should be updated internally

// In these types of state, there are different variables which define the state:
// 1. reach100 -> boolean, indicates if the current observed edge element reach threshold 100%
// 2. reach0 -> boolean, indicates if the current observed showup element reaches threshold 0
// 3. edgeIdx -> integer, indicates the observed edge element index in edge element array
// 4. showupIdx -> integer, indicates the observed showup element index in showup element array
// 5. sectionState -> STICKY or FLOAT, indicates the current state of component
// 6. windowStart -> window start value, initial value is 0 and range is >= 0 and <= LENGTH - window size

export type StateType = {
  edgeStates: Array<boolean>
  showupStates: Array<boolean>
  edgeIndex: number
  showupIndex: number
  windowStart: number
  stepLength: number
  sectionState: SECTION_STATE
}

interface ActionType {
  type: REDUCER_TYPE
  payload: { index: number; value: boolean }
}

// TODO: The states array get updated once observers are triggered when scroll up/down
// then update the section state, window start and observed element indexes according to the value of reach0 and reach100
function FolderFlipReducer(state: StateType, action: ActionType): StateType {
    if (!action) return state

  // set the value of edge state with given index
  if (action.type === REDUCER_TYPE.EDGE) {
    state.edgeStates[action.payload.index] = action.payload.value
  } else if (action.type === REDUCER_TYPE.SHOWUP) {
    state.showupStates[action.payload.index] = action.payload.value
  }

  let edgeIndex = state.edgeIndex,
    showupIndex = state.showupIndex,
    sectionState = state.sectionState,
    windowStart = state.windowStart

  const reach0 = state.showupStates[state.showupIndex - windowSize + 1],
    reach100 = state.edgeStates[state.edgeIndex - windowSize + 1]

  // console.log(
  //   "0: ",
  //   reach0,
  //   ", 100: ",
  //   reach100,
  //   ", state: ",
  //   state.sectionState,
  //   ", start: ",
  //   windowStart,
  //   ", edgeIdx: ",
  //   state.edgeIndex,
  //   ", showupIdx: ",
  //   state.showupIndex,
  //   ", edge states: ",
  //   JSON.stringify(state.edgeStates),
  //   ", showup states: ",
  //   JSON.stringify(state.showupStates)
  // );

  // if the prev state is initial stable state, just update the section state
  if (!reach0 && reach100 && edgeIndex + 1 === showupIndex) {
    sectionState = SECTION_STATE.FLOAT
    return {
      ...state,
      sectionState
    }
  }

  // if the prev state is final stable state
  if (reach0 && !reach100 && edgeIndex === showupIndex) {
    sectionState = SECTION_STATE.STICKY
    return {
      ...state,
      sectionState
    }
  }

  // all the other four situations would need to be handled under state type scroll
  // handle the pink ones in state machine diagram

  // if edge and showup observed elements are the same, set the state as float
  if (edgeIndex === showupIndex) sectionState = SECTION_STATE.FLOAT

  // otherwises, sticky
  if (edgeIndex + 1 === showupIndex) sectionState = SECTION_STATE.STICKY

  // need to update the edge and showup index in the internal state type

  if (sectionState === SECTION_STATE.FLOAT) {
    if (reach0 && reach100) {
      if (windowStart + windowSize < state.stepLength)
        showupIndex = windowStart + windowSize
    } else if (!reach0 && !reach100) {
      windowStart = state.windowStart > 0 ? state.windowStart - 1 : 0
      edgeIndex = state.windowStart + windowSize - 2
    }
  }

  if (sectionState === SECTION_STATE.STICKY) {
    if (!reach0 && !reach100) {
      if (windowStart > 0) showupIndex = windowStart + windowSize - 1
    } else if (reach0 && reach100) {
      edgeIndex = windowStart + windowSize
      windowStart =
        state.windowStart + windowSize < state.stepLength
          ? state.windowStart + 1
          : state.stepLength - windowSize
    }
  }

  return {
    ...state,
    windowStart,
    edgeIndex,
    showupIndex,
    sectionState
  }
}

export default FolderFlipReducer
