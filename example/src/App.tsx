import React from 'react'
import FolderFlip from 'react-folderflip'

const steps = [
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
  },
  {
    header: (
      <div style={{ width: '100%', height: '50px', background: 'blue' }}>
        step2
      </div>
    ),
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'blue'
        }}
      >
        content2
      </div>
    )
  },
  {
    header: (
      <div style={{ width: '100%', height: '50px', background: 'yellow' }}>
        step3
      </div>
    ),
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'yellow'
        }}
      >
        content3
      </div>
    )
  },
  {
    header: (
      <div style={{ width: '100%', height: '50px', background: 'brown' }}>
        step4
      </div>
    ),
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'brown'
        }}
      >
        content4
      </div>
    )
  },
  {
    header: (
      <div style={{ width: '100%', height: '50px', background: 'orange' }}>
        step5
      </div>
    ),
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'orange'
        }}
      >
        content5
      </div>
    )
  },
  {
    header: (
      <div style={{ width: '100%', height: '50px', background: 'pink' }}>
        step6
      </div>
    ),
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'pink'
        }}
      >
        content6
      </div>
    )
  }
]

const App = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ overflow: 'auto', height: '100vh' }}>
        {Array.from({ length: 40 }, () => (
          <div>
            test teste test esktsetsetest teste test esktsetsetest teste test
            esktsetsetest teste test esktsetsetest teste test esktsetsetest
            teste test esktsetsetest teste test esktsetsetest teste test
            esktsetsetest teste test esktsetsetest teste test esktsetsetest
            teste test esktsetse
          </div>
        ))}
      </div>
      <div style={{ overflow: 'auto', height: '100vh' }}>
        <div>
          test teste test esktsetsetest teste test esktsetsetest teste test
          esktsetsetest teste test esktsetsetest teste test esktsetsetest teste
          test esktsetsetest teste test esktsetsetest teste test esktsetsetest
          teste test esktsetsetest teste test esktsetsetest teste test esktsetse
        </div>
        <div>
          test teste test esktsetsetest teste test esktsetsetest teste test
          esktsetsetest teste test esktsetsetest teste test esktsetsetest teste
          test esktsetsetest teste test esktsetsetest teste test esktsetsetest
          teste test esktsetsetest teste test esktsetsetest teste test esktsetse
        </div>
        <div>
          {/* <div style={{width: '500px', height: '400px'}}> */}
          <FolderFlip Steps={steps} />
        </div>
        <div>
          test teste test esktsetsetest teste test esktsetsetest teste test
          esktsetsetest teste test esktsetsetest teste test esktsetsetest teste
          test esktsetsetest teste test esktsetsetest teste test esktsetsetest
          teste test esktsetsetest teste test esktsetsetest teste test esktsetse
        </div>
      </div>
    </div>
  )
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
