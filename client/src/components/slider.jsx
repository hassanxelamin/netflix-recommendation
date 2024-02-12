import React from 'react'
import SliderItem from './slider-item';

const Slider = () => {
  
  const images = [
    'images/dune1.jpg',
    'images/dune2.jpg',
    'images/dune3.jpg',
    'images/dune4.jpg',
    'images/dune5.jpg',
    'images/dune6.jpg',
    'images/dune7.jpg',
    'images/dune8.jpg',
    'images/dune9.jpg',
    'images/dune10.jpg',
    'images/dune11.jpg',
    'images/dune12.jpg',
    'images/dune13.jpg',
    'images/dune14.jpg',
  ];

  return (
    <section 
      id="container" data-name="container"
      className='w-full py-20 flex flex-col justify-center'
    >
      <div className='text-white font-bold text-[2.5rem] pb-3 pl-40'>Matched to You</div>
      <div id="slider" data-name="slider" className='flex w-full gap-x-2'>
        {images.map((image, index) => (
          <SliderItem index={index} image={image} />
        ))}
      </div>
    </section>
  )
}

export default Slider