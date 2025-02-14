import React from 'react'
import Navbar from './Navbar'
import './Footer.css'

const Footer = () => {
  return (
    <div>
      <div className='box'>
        <div className='product-head'>
        <h2 style={{color:"blue"}}>GET SAFE BY USING OUR PRODUCT</h2>
        </div>
        
        <p>This product will bring the change by using AI as its foundation. It will detect crime , alert us about it and help in making our city safe</p>
        <div className='mail-box'>
          <div >
            <input className="mail-input" placeholder='Enter Your Email'>
            </input>
          </div>
          <div>
          <button className='button'>
              Subscribe
            </button>
          </div>
        </div>
        <Navbar></Navbar>

      </div>
    </div>
  )
}

export default Footer
