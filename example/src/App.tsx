import React from 'react'

import FolderFlip from 'react-folderflip'

const steps = [
  { header: 'step1' },
  { header: 'step2' },
  { header: 'step3' },
  { header: 'step4' }
]

console.log('adf: ', FolderFlip)

const App = () => {
  return <FolderFlip Steps={steps} />
  // return <ExampleComponent text='Create React Library Example 😄' />
}

export default App

// &-Content {
//   position: sticky;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   &-Title {
//     padding-top: 10px;
//     text-align: center;
//     font-family: Fann-Grotesque-Black-Pro;
//     font-size: 40px;
//     font-weight: 900;
//   }

//   &-Container {
//     padding-top: 40px;
//     display: flex;
//     flex-direction: column;
//     justify-content: start;
//     align-items: center;
//     gap: 34px;

//     @media (min-width: ${md}) {
//       align-items: start;
//       justify-content: center;
//     }

//     @media (min-width: ${lg}) {
//       max-width: 944px;
//       flex-direction: row;
//       align-items: start;
//       padding-top: 64px;
//       gap: 48px;
//     }

//     @media (min-width: ${xl}) {
//       max-width: 1068px;
//       justify-content: center;
//     }

//     img {
//       border-radius: 8px;
//       object-fit: cover;
//       @media (max-width: ${md}) {
//         width: 335px;
//         height: 224px;
//       }

//       @media (min-width: ${md}) {
//         width: 728px;
//         height: 334px;
//         align-self: center;
//       }

//       @media (min-width: ${lg}) {
//         width: 486px;
//         height: 334px;
//       }
//     }

//     div {
//       @media (min-width: ${lg}) {
//         padding: 0;
//         padding-top: 54px;
//       }
//       @media (min-width: ${md}) and (max-width: ${lg}) {
//         max-width: 648px;
//       }
//     }

//     button:last-child {
//       ${buttons.ButtonStyle}
//       ${buttons.ButtonColorFunc('#000')}
//     }
//   }
// }

// const input = [
//   {
//     header: <div></div>,
//     content: (
//       <div>
//         <span className='FolderFlip-Content-Title'>FolderFlip 1</span>
//         <div className='FolderFlip-Content-Container'>
//           <div>test test test </div>
//         </div>
//       </div>
//     )
//   },
//   {
//     header: <div></div>,
//     content: (
//       <div>
//         <span className='FolderFlip-Content-Title'>FolderFlip 2</span>
//         <div className='FolderFlip-Content-Container'>
//           <div>test test test </div>
//         </div>
//       </div>
//     )
//   },
//   {
//     header: <div></div>,
//     content: (
//       <div>
//         <span className='FolderFlip-Content-Title'>FolderFlip 3</span>
//         <div className='FolderFlip-Content-Container'>
//           <div>test test test </div>
//         </div>
//       </div>
//     )
//   }
// ]
