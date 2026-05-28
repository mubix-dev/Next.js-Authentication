"use client"

import React from "react"


function page({params}:any) {
    const {id} =  React.use(params)
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        Profile page <span className='ml-2 p-2 bg-black text-amber-50'>{id}</span>
    </div>
  )
}

export default page