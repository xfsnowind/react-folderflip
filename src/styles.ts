import styled from 'styled-components'
import { md, lg, xl } from './screen'
import buttons from './button'

const FolderFlipStyles = styled.section`
  counter-reset: section;
  .FolderFlip {
    &-Tag {
      display: inline-block;
      width: 100%;
      border-radius: 16px 16px 0 0;
      display: flex;
      padding-top: 40px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-decoration: none;

      &-Number {
        &:before {
          counter-increment: section;
          content: counter(section);
          font-family: Fann-Grotesque-Light-Pro;
          font-weight: 300;
          font-size: 40px;
          line-height: 100%;
        }
      }
    }


  }
`

export default FolderFlipStyles
