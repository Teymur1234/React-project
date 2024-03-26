import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className="footparts">
          <h3>Help</h3>
          <ul>
            <li>Contact us</li>
            <li>Account</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>FAQ</li>
          </ul>
        </div>  
        <div className="footparts">
          <h3>About</h3>
          <ul>
            <li>About us</li>
            <li>Press</li>
            <li>Careers</li>
            <li>Team</li>
            <li>FAQ</li>
          </ul>
        </div> 
        <div className="footparts">
          <h3>Shop</h3>
          <ul>
            <li>Store</li>
            <li>Gift Cards</li>
            <li>Student Discount</li>
          </ul>
        </div> 
        <div className="footparts1">
          <h3>Join our list and receive exclusives</h3>
          <div className="input">
            <input type="text" placeholder='Email adress'/>
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>  
      <div className="foot">
        <p>Copyright ©2024 All rights reserved | This template is made with  by Colorlib</p>
      </div>
    </>
  )
}

export default Footer