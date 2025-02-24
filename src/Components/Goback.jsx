import { ArrowBigLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router'
const Goback = () => {
    const navigate = useNavigate();
  return (
    <ArrowBigLeft onClick={()=>navigate(-1)} className=' w-10 h-10 ' />
  )
}

export default Goback