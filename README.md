# react-folderflip

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-folderflip.svg)](https://www.npmjs.com/package/react-folderflip) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://img.shields.io/github/actions/workflow/status/xfsnowind/react-folderflip/build.yml?branch=main)](https://github.com/xfsnowind/react-folderflip/actions/workflows/build.yml?query=branch%3Amain)
[![Test Status](https://img.shields.io/github/actions/workflow/status/xfsnowind/react-folderflip/test.yml?branch=main)](https://github.com/xfsnowind/react-folderflip/actions/workflows/test.yml?query=branch%3Amain)

## Install

```bash
npm install --save react-folderflip
```

## Usage

```tsx
import React from 'react'
import FolderFlip from 'react-folderflip'

const steps = [
  {
    header: (
      <div style={{ width: '100%', height: '50px', background: 'pink' }}>step1</div>
    ),
    content: (
      <div style={{ width: '100%', height: '100%', background: 'pink' }} >content1</div>
    )
  },
  {
    header: (
      <div style={{ width: '100%', height: '50px', background: 'blue' }}>step2</div>
    ),
    content: (
      <div style={{ width: '100%', height: '100%', background: 'blue' }}>content2</div>
    )
  }
]

const Component = () => {
  return <FolderFlip Steps={steps} />
}
```

## Example

Check [here](https://xfsnowind.github.io/react-folderflip/)

## Todo list

- [] Component in different framework
- [] Allow component be a non full-screen element
- [] Allow to set window size as parameter

## License

MIT © [xfsnowind](https://github.com/xfsnowind)
