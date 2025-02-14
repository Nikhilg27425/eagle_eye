import React from 'react'
import './Navbar.css'
import  logo from './logo 4.png' 
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   
    <div className='navbar'>
      
      <img src={logo} alt=''></img>
   
       
            <Link className='links' to='/'>
            HOME
            </Link>
        
        
      
        
    
        <Link className='links' to='/model1'> MODEL1</Link>
       
    
      <Link className='links' to='/model2'> MODEL2</Link>
       
        <Link className='links' to='/model3'> MODEL3</Link>
      
        <Link className='links' to='/team'>
        TEAM
        </Link>
    </div>
  )
}

export default Navbar;
