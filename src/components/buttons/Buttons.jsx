import React from 'react'

export const KeyedButton = ({text}) => {
  return (
    <button className="bg-key text-white  ">{text}</button>
  )
}

export const SmlButton = ({text, id}) => {
  return (
    <button className="bg-key text-white px-2 py-1 text-sm  ">{text}</button>
  )
}

