import React from 'react'
import Slider from '../components/slider'

const Home = () => {
  return (
    <div className='bg-black w-screen h-screen overflow-hidden'>
        <div className='w-screen flex items-center justify-center pt-10'>
          <h1 className='font-arial text-red-500 text-[3.2rem] font-bold'>NETFLIX</h1>
        </div>
        <div>
          <Slider />
        </div>
    </div>
  )
}

export default Home