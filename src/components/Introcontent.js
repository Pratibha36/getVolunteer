import React from 'react'
import bg from '../assets/bgimage.jpg'
import  './intro.css'
import slide1 from '../assets/slide1.jpg'
import slide2 from '../assets/slide2.jpg'
import slide3 from '../assets/slide3.jpg'
import slide4 from '../assets/slide4.jpg'
import slide5 from '../assets/slide5.jpg'
import SimpleImageSlider from "react-simple-image-slider";
import { useStateValue } from './StatePovider';


const Introcontent = () => {
    const [{ openloginmodal, iserror, errorMessage }, dipatch] = useStateValue();
    const images = [
        { url: slide1 },
        { url: slide2 },
        { url: slide3 },
        { url: slide4 },
        {url: slide5},
      ];
  return (
    <div className={iserror?"blur":""}style={{ backgroundImage: `url(${bg})`,
        marginTop:"-25px",
        height:"500px",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }}>
            <div className='introall'>
            <div className='introtext'>
                <h1>NITC's Ladies Hostel </h1> 
                <h1>Welcomes You!!</h1>
            
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
            {/* <div className='intro_box'>
                <h3 classNane="content1"><span style={{color:"green", fontWeight:"bold", marginRight :"10px"}}>100+</span>Jobs</h3>
                <h3 classNane="content2"><span style={{color:"green", fontWeight:"bold", marginRight :"10px"}}>500+</span>Students</h3>
                <h3 classNane="content3 "><span style={{color:"green", fontWeight:"bold", marginRight :"10px"}}>100+</span>Faculties</h3>   
            </div> */}
    </div>
  )
}

export default Introcontent