import React from 'react'
import LogoPng from '../assets/logo.png'

function Logo({ width = '50px' }) {
  return (
    <img
      alt="Logo"
      src={LogoPng}
      width={width}
      className="rounded-full"
    />
  )
}

export default Logo