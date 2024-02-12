import React from 'react'

const SliderItem = ({ index, image }) => {
  return (
    <img 
      key={index} 
      src={image} 
      alt={`Image ${index + 1}`} 
      className='flex-grow-0 flex-shrink-0 max-w-[15%] aspect-video object-cover p-1 rounded-2xl'
    />
  )
}

export default SliderItem