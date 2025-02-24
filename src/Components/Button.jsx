import React from 'react'
import { useSelector } from 'react-redux'
const Button = ({text,func}) => {
    const { theme } = useSelector(state => state.user)
  return (
    <button className={`  rounded-lg p-3 cursor-pointer ${theme === 'light'? 'dark' : 'light'}`} onClick={func}>
        {text}
    </button>
  )
}

export default Button