import React from 'react'
import FolderFlip from './folderFlip'
import { steps } from './mockData'

describe('<FolderFlip />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FolderFlip Steps={steps}/>)
  })
})
