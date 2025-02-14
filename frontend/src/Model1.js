import React from 'react'
import mainimg from './image 1.png'
import Navbar from './Navbar';
import './App.css';
import Footer from './Footer';
import './Model1.css'
import burglary from './burglary.png'




const Model1 = () => {
  return (
    <div className="App-wrapper ">
      <div className="navbarbox">
        <Navbar></Navbar>
      
        </div>
       <div className='mainbox'>
          <div className='heading'><h2>Life Camera Footage</h2></div>
          <img className='img-main' src={mainimg}></img>
          
          <div className='text-box'>
          <h1 style={{ textAlign: "center" }}>CRIME PREVENTION MODEL</h1>
          <div style={{display:'flex' } } >
              <div className='boxes'>
                <img className='burglary' src={burglary}></img>
              </div>
              <div className='boxes' id='box2'>
                <div >
                  <h2 className='location-heading'>
                    Enter location
                  </h2>
                </div>
                <div>
                  <div className='label-box'>
                    <label className='labels'>
                      Address:
                    </label>
                    <input className='input-box'></input>
                   
                  </div>
                  </div>
                  
                <div>
                  <div className='label-box'>
                    
                    <label className='labels'>
                      City:    
                    </label>
                    
                    
                    
                    <input className='input-box'></input>
                  </div>
                  </div>
                  
                <div>
                  <div className='label-box'>
                    <label className='labels'>
                      State:
                    </label>
                    
                    <input className='input-box'></input>
                  </div>
                  </div>
                  
                <div>
                  <div className='label-box'>
                    <label className='labels'>
                      Camera No.:
                    </label>
                    
                    <input className='input-box'></input>
                  </div>
                  </div>
                  
                <div >
                  <button className='button'>
                   
                    Enter
                      
                      </button>
                  </div>
                
              </div>
            </div>
            <div className='prediction-box'>
              <div className='prediction-head'><h2>Predicted Crime: </h2></div>
              <div className='result-box'><input className='result-box'></input></div>
            </div>
            
            </div>
            <button className='button' id='Report-button'>     Report
                     
            </button>
          
          </div>
        
         <div className='footer-box'>
          <Footer/>
        </div>
      </div>
    

   

  )
}

export default Model1
