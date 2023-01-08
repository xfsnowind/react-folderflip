import '@testing-library/jest-dom'
import FolderFlipReducer, { StateType } from './folderFlipReducer'
import CONSTANTS, { REDUCER_TYPE, SECTION_STATE } from './constants'

const { windowSize } = CONSTANTS
let initialState: StateType = {
  edgeStates: [false, false, false, false, false, false],
  showupStates: [false, false, false, false, false, false],
  edgeIndex: windowSize - 1,
  showupIndex: windowSize,
  windowStart: 0,
  stepLength: 6,
  sectionState: SECTION_STATE.STICKY
}

beforeEach(() => {
  initialState = {
    edgeStates: [false, false, false, false, false, false],
    showupStates: [false, false, false, false, false, false],
    edgeIndex: windowSize - 1,
    showupIndex: windowSize,
    windowStart: 0,
    stepLength: 6,
    sectionState: SECTION_STATE.STICKY
  }
})

// test('should return the initial state when no action is passed', () => {
//   expect(FolderFlipReducer(initialState)).toEqual(initialState)
// })

test(`should update the edgeStates state array correctly, change section state to float
and update the edge index when the REDUCER_TYPE.EDGE action is dispatched`, () => {
  const action = {
    type: REDUCER_TYPE.EDGE,
    payload: { index: 0, value: true }
  }
  const expectedState = {
    ...initialState,
    sectionState: SECTION_STATE.FLOAT,
    edgeStates: [true, false, false, false, false, false]
  }
  expect(FolderFlipReducer(initialState, action)).toEqual(expectedState)
})

test('should handle SHOWUP action on initial state', () => {
  const action = {
    type: REDUCER_TYPE.SHOWUP,
    payload: { index: 3, value: true }
  }
  const expectedState = {
    ...initialState,
    showupStates: [false, false, false, true, false, false],
    showupIndex: 3
  }
  expect(FolderFlipReducer(initialState, action)).toEqual(expectedState)
})
