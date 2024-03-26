import React, { useState } from 'react'
import "./checkout.css"
import { useDispatch, useSelector } from 'react-redux'
import { FiXSquare } from "react-icons/fi";
import { addBasket, changeCount, removeBasket,removeSale,saleBasket } from '../../slice/BasketSlice';
import { useNavigate } from 'react-router-dom';

const couponCodes=["sahin istemersen adin olsun kahin","nesib coreyi ye kesib","elxan istemersen adin olsun sirxan","hesen hesen sen nesen"]

const Checkout = () => {
    const dispatch=useDispatch()
    const basket=useSelector(state=>state.basket.items)
    const total=useSelector(state=>state.basket.total)
    const increase=(item)=>{
        dispatch(addBasket(item))
    }
    const decrease=(item)=>{
        dispatch(changeCount(item))
    }
    const remove=(id)=>{
        dispatch(removeBasket(id))
    } 
   const [coupon,setCoupon]=useState("")
    const handleChange=(e)=>{
        setCoupon(e.target.value)
    }
    const [couponTrue,setCouponTrue]=useState(false)
    const applyCoupon=()=>{
       const codeCorrector=couponCodes.findIndex(code=>code===coupon)
        if(codeCorrector>-1){
            dispatch(saleBasket())
            alert("50% endirim tetbiq olundu")
            setCouponTrue(true)
        }
        else{
            alert("Kod sehvdir duz kod girin")
        }
    }
    const removeCoupon=()=>{
        alert("kupon deaktiv edildi")
        setCoupon("")
        dispatch(removeSale())
        setCouponTrue(false)
    }
    const navigate=useNavigate()
    const goHome=()=>{
        navigate('/')
      }
  return (
   <>
    <div className='cart'>
        <div>
            <h1>Cart</h1>
            <p>Home / Cart</p>
        </div>
    </div>
    <div className='table'>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {basket && basket.map((item)=>(
                            <tr key={item.id}>
                                <td><img src={item.image} alt="" className='item-images'/></td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td><button onClick={()=>decrease(item)}>-</button>{item.count}<button onClick={()=>increase(item)}>+</button></td>
                                <td>{item.price*item.count}</td>
                                <td><FiXSquare onClick={()=>remove(item.id)}></FiXSquare></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
      <div className='section2'>
        <div className="coupon">
            <div className="back">
                <button>UPDATE CART</button>
                <button onClick={()=>goHome()}>CONTINUE SHOPPING</button>
             </div>
            <div className="enter-coupon">
                <h1>Coupon</h1>
                <p>Enter your coupon code if you have one.</p>
                <div>
                <input type="text" value={coupon} onChange={(e)=>handleChange(e)} placeholder='Coupon code' />
                <button onClick={()=>applyCoupon()}>APPLY COUPON</button>
                {couponTrue ? (
                    <button onClick={()=>removeCoupon()}>Remove Coupon</button>
                ): console.log("salam")}
                </div>
            </div>
        </div>
        <div className="totals">
                <h2>CART TOTALS</h2>
                <div className="price">
                    Total                    <p>$ {total}</p>
                </div> 
                <button>PROCEED TO CHECKOUT</button>
            </div>
      </div>
   </>
  )
}

export default Checkout