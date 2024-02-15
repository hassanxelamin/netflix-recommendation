import React, { useState, useEffect } from 'react'
import SliderItem from './slider-item';

const Slider = () => {

  const [images, setImages] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState("The Godfather");
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://localhost:8000/recommendations/${selectedMovie}`);
        const data = await response.json();
        setImages(data.posters); 
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, [selectedMovie]);

  return (
    <section 
      id="container" data-name="container"
      className='w-full py-20 flex flex-col justify-center'
    >
      <div className='text-white font-bold text-[2.5rem] pb-3 pl-40'>Matched to You</div>
      <div id="slider" data-name="slider" className='flex w-full gap-x-2'>
        {images.map((image, index) => (
          <SliderItem key={index} index={index} image={image} />
        ))}
      </div>
    </section>
  )
}

export default Slider