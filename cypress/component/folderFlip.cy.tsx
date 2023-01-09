import { mount } from 'cypress/react'
import React from 'react'
import FolderFlip from '../../src/folderFlip'
import { steps } from '../../src/mockData'

describe('<FolderFlip />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<FolderFlip Steps={steps}/>)
    cy.get('section').should('contains.class', 'FolderFlip')
  })
})
