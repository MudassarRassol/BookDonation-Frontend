import React from 'react'

const Nobookmsg = ({img,Nobookmsg}) => {
  return (
    <div className=' h-[82vh] flex  justify-center items-center text-center  ' >
    <div>
        <img src={img} className=' w-80 h-80 ' alt="" />
        <p>{Nobookmsg}</p>
    </div>
</div>
  )
}

export default Nobookmsg