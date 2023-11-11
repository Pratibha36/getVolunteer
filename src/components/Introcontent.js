import React from 'react'
import bg from '../assets/bgimage.jpg'
import  './intro.css'
import slide1 from '../assets/slide1.png'
import slide2 from '../assets/slide2.png'
import slide3 from '../assets/slide3.jpeg'
import slide4 from '../assets/slide4.jpg'
import slide5 from '../assets/slide5.jpeg'
import SimpleImageSlider from "react-simple-image-slider";


const Introcontent = () => {
    const images = [
        { url: slide1 },
        { url: slide2 },
        { url: slide3 },
        { url: slide4 },
        {url:slide5},
      ];
  return (
    <div style={{ backgroundImage: `url(${bg})`,
        marginTop:"-25px",
        height:"500px",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }}>
            <div className='introall'>
            <div className='introtext'>
                <h1>NITC's finest volunteering platform</h1> 
                <h1> to apply & get volunteers </h1>
                <h1>EASILY!</h1>
            </div>
            <div>
                <SimpleImageSlider
                    width={700}
                    height={400}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    slideDuration={0.5}
                    autoPlay={true}
                    autoPlayDelay={2.0}
                    />
            </div>
            </div>
            <div className='intro_box'>
                <h3 classNane="content1">quer</h3>
                <h3 classNane="content2">abbckas</h3>
                <h3 classNane="content3 ">ghavs</h3>   
            </div>
    </div>
  )
}

export default Introcontent