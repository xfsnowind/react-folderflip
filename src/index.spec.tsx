import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import FolderFlip from '.'
import { steps } from './mockData'

const wrongData = [
  {
    header: (
      <div
        style={{
          width: '100%',
          height: '50px',
          background: 'red'
        }}
      >
        step1
      </div>
    ),
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'red'
        }}
      >
        content1
      </div>
    )
  }
]

const windowSize = 3

test('should throw an error if Steps is not an array with at least two items', () => {
  expect(() => {
    render(<FolderFlip Steps={wrongData} />)
  }).toThrowError('Steps should be an array and contain at least two items.')
})


test('should render the correct number of content elements', () => {
  const { getAllByTestId } = render(<FolderFlip Steps={steps} />);
  const contentElements = getAllByTestId('FolderFlip-Content');
  expect(contentElements).toHaveLength(steps.length);
});


test('should set up the IntersectionObserver correctly', () => {
  const mockObserve = jest.fn();
  const mockIntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: mockObserve,
    disconnect: jest.fn()
  }));
  (global as any).IntersectionObserver = mockIntersectionObserver;
  render(<FolderFlip Steps={steps} />);
  expect(mockIntersectionObserver).toHaveBeenCalledTimes(2 * (steps.length - windowSize + 1));
  expect(mockObserve).toHaveBeenCalledTimes(2 * (steps.length - windowSize + 1));
});
