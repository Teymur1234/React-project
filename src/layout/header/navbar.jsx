import React, {  useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import {  IoMdMenu } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import "./navbar.css"
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { removeBasket } from '../../slice/BasketSlice';

const Navbar = () => {
    const [isSidebarOpen,setSidebarOpen]=useState(false)
    const [isBasketOpen,setBasketOpen]=useState(false)
    const dispatch=useDispatch()
    const basket=useSelector(state=>state.basket.items)
    const removeProduct=(id)=>{
        dispatch(removeBasket(id))
    }
  const navigate=useNavigate()
  
  const goCheckout=()=>{
    navigate('/checkout')
  }
  const goAdmin=()=>{
    navigate('/admin')
  }

  return (
    <>
        <nav>
            <h3>Product</h3>
            <ul className='menulinks'>
                <li><NavLink to={"/"} activeclassname="active">NEW</NavLink></li>
                <li><NavLink to={"/men"} activeclassname="active">MEN</NavLink></li>
                <li><NavLink to={"/women"} activeclassname="active">WOMEN</NavLink></li>
                <li><NavLink to={"/accesories"} activeclassname="active">ACCESSORIES</NavLink></li>
                <li><NavLink to={"/jewelry"} activeclassname="active">JEWELRY</NavLink></li>
                <li><NavLink to={"/about"} activeclassname="active">ABOUT</NavLink></li>
                <li><NavLink to={"/contact"} activeclassname="active">CONTACT</NavLink></li>
            </ul>
            <div className='icons'>
             <FaSearch />
             <FaUser className='admin' onClick={()=>goAdmin()}></FaUser>
            <div className="basketicon">
             <IoCartOutline style={{cursor:"pointer"}} onClick={()=>setBasketOpen(true)}></IoCartOutline>
            <span>{basket ? basket.length : 0}</span>
            </div>
            <div className='hamburger'>
                <IoMdMenu className='hamburgermenu' onClick={()=>setSidebarOpen(true)} ></IoMdMenu>
            </div>
            </div>
        
        </nav>
        <div className={`sidebar ${isSidebarOpen ? 'open': ''}`} >
                <IoMdClose className='close' onClick={()=>setSidebarOpen(false)}></IoMdClose>
                <ul className='menulinks-sidebar'>
                 <li><NavLink to={"/"} activeclassname="active-sidebar">NEW</NavLink></li>
                 <li><NavLink to={"/men"} activeclassname="active-sidebar">MEN</NavLink></li>
                 <li><NavLink to={"/women"} activeclassname="active-sidebar">WOMEN</NavLink></li>
                 <li><NavLink to={"/accesories"} activeclassname="active-sidebar">ACCESSORIES</NavLink></li>
                 <li><NavLink to={"/jewelry"} activeclassname="active-sidebar">JEWELRY</NavLink></li>
                 <li><NavLink to={"/about"} activeclassname="active-sidebar">ABOUT</NavLink></li>
                 <li><NavLink to={"/contact"} activeclassname="active-sidebar">CONTACT</NavLink></li>
               </ul>
        </div>
        <div className={`basket-sidebar ${isBasketOpen? 'open': ''}`}>
             <IoMdClose className='close' style={{cursor:"pointer"}} onClick={()=>setBasketOpen(false)}></IoMdClose>
             <h3>Items</h3>
             <div className='basket-items1'>
                {basket ? basket.map((item)=>(
                  <div key={item.id} className='product-div'>
                     <div>
                     <img src={item.image} alt="" className='product-image1'/>
                     <MdDelete className='delete-icon' onClick={()=>removeProduct(item.id)}></MdDelete>
                     </div>
                     <div>
                     <p>{item.name}</p>
                     <p>Price : {item.count} x {item.price} = {item.count*item.price}</p>
                     </div>
                  </div>  
                )):(<p>The basket is empty</p>)}
             </div>
             <div className="buttons">
                <button onClick={goCheckout}>Go to CheckOut</button>
             </div>
        </div>
    </>
  )
}

export default Navbar