import React from 'react'
import { useSelector } from 'react-redux'
const Loading = () => {
  const { theme } = useSelector((state) => state.user);
  return (
    <div className="flex justify-center items-center py-10 h-[90vh]">
    <div className={
      `animate-spin h-10 w-10 border-4 border-${theme === 'light'? 'bg-amber-950' : 'bg-white'} border-t-transparent rounded-full`
    }></div>
  </div>
  )
}

export default Loading