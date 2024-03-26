import React, { useEffect, useState } from 'react'
import './home.css'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsShieldLock } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import axios from 'axios';
import Slide from './slide';
import { useDispatch } from 'react-redux';
import { addBasket } from '../../slice/BasketSlice';


const images=['https://preview.colorlib.com/theme/product/images/hero_bg_5.jpg.webp','https://preview.colorlib.com/theme/product/images/hero_bg_6.jpg.webp']
const New = () => {
  const [currentIndex,setCurrentIndex]=useState(0)
  const goPrevSlide=()=>{
    setCurrentIndex((curIndex)=>curIndex===0 ? images.length-1 : curIndex-1)
  }
  const goNextSlide=()=>{
    setCurrentIndex((curIndex)=>curIndex===images.length-1 ? 0: curIndex+1)
  }
  const slideStyle = {
    backgroundImage: `url(${images[currentIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '600px',
  };

   const [data,setData]=useState([])
   useEffect(()=>{
    axios("http://localhost:3001/products").then(data=>setData(data.data))
   },[data])

  const dispatch=useDispatch()

  const addedBasket=(product)=>{
    dispatch(addBasket(product))
  }
   return (
    <>
      <div className="slider" style={{backgroundImage:`url${images[currentIndex]}`}}>
        <MdKeyboardArrowLeft className='prev' onClick={goPrevSlide}></MdKeyboardArrowLeft>
        <div className='slide' style={slideStyle}>
          <h1>The New Way To Display <br /> Product by Colorlib</h1>
          <button>EXPLORE NOW</button>
        </div>
        <MdKeyboardArrowRight className='next' onClick={goNextSlide}></MdKeyboardArrowRight>
      </div>
      <div className='information'>
        <div className='information-parts'>
           <CiDeliveryTruck />
           <h3>WORLDWIDE DELIVERY</h3>
           <p>Far far away, behind the word mountains,</p>
           <p>far from the countries.</p>
        </div>
        <div className='information-parts'>
            <BsShieldLock/>
            <h3>SECURE PAYMENTS</h3>
            <p>Far far away, behind the word mountains,</p>
            <p>far from the countries.</p>
        </div>
        <div className='information-parts'>
            <IoReload/>
            <h3>SIMPLE RETURNS</h3>
            <p>Far far away, behind the word mountains,</p>
            <p>far from the countries.</p>
        </div>
      </div>
      <div className='products'>
          {data && data.map(product=>(
            <div key={product.id} className='product'>
              <img src={product.image} alt="" />
              <h3>{product.name}</h3>
              <div className='price'>
                 <p>£{product.price}</p>
                <button onClick={()=>addedBasket(product)}>Add Basket</button>
              </div>
            </div>
          ))}
      </div>
      <section className='image-section'>
        <div className='image'>
            <div className='image-div'>
              <p>Limited Offers 20% OFF</p>
              <h1>Week Deal</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum <br /> fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis <br /> neque nulla earum.</p>
              <button>SHOP NOW</button>
            </div>
        </div>
      </section>
      <Slide/>

    </>
  )}

export default New