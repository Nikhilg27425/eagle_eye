import React from 'react'
import mainimg from './image 1.png'
import Navbar from './Navbar';
import './App.css';
import Footer from './Footer';
import './Model1.css'
import boy from './boy_pic.jpg'
import khushi from './girl_pic.jpg'

const Team = () => {
  return  (
    <div className="App-wrapper ">
      <div className="navbarbox">
        <Navbar></Navbar>
      
        </div>
       <div className='mainbox' style={{padding:"0.1%",color:"white",textAlign:"center",overflowWrap:'hidden'}}>
        
          <h1>OUR TEAM</h1>
          <div style={{display:"flex", justifyContent:"space-between",paddingLeft:"2%",paddingRight:"2%",paddingBottom:"1%"}}>
            <div style={{height:"35vh",width:"35vh "}}>
              <div style={{height:"50%",width50:"50%",background:"white",borderRadius:"40px 40px 0px 0px"}}>
              <img src={boy} style={{width:"100%",height:"100%"}}></img>
              </div>
              <div style={{height:"50%",width50:"50%",background: "#F29040"
                  ,borderRadius:"0px 0px 40px 40px",padding:"3%",color:"black"}}>
                   <div style={{padding:"3%",fontWeight:"bolder",fontSize:"large"}}>Dhruv Sangal</div>
                   <div style={{padding:"3%"}}>2nd year CSE</div>
                   <div style={{padding:"5%",fontSize:"large"}}>LNMIIT,Jaipur</div>
              
              </div>
            </div>
            <div style={{height:"35vh",width:"35vh "}}>
              <div style={{height:"50%",width50:"50%",background:"white",borderRadius:"40px 40px 0px 0px"}}>
              <img src={boy} style={{width:"100%",height:"100%"}}></img>
              </div>
              <div style={{height:"50%",width50:"50%",background: "#F29040"
                  ,borderRadius:"0px 0px 40px 40px",padding:"3%",color:"black"}}>
                   <div style={{padding:"3%",fontWeight:"bolder",fontSize:"large"}}>Aditya Sharma</div>
                   <div style={{padding:"3%"}}>2nd year CSE</div>
                   <div style={{padding:"5%",fontSize:"large"}}>LNMIIT,Jaipur</div>
              
              </div>
            </div>
            <div style={{height:"35vh",width:"35vh "}}>
              <div style={{height:"50%",width50:"50%",background:"white",borderRadius:"40px 40px 0px 0px"}}>
              <img src={boy} style={{width:"100%",height:"100%"}}></img>
              </div>
              <div style={{height:"50%",width50:"50%",background: "#F29040"
                  ,borderRadius:"0px 0px 40px 40px",padding:"3%",color:"black"}}>
                   <div style={{padding:"3%",fontWeight:"bolder",fontSize:"large"}}>Dhyanesh</div>
                   <div style={{padding:"3%"}}>2nd year CSE</div>
                   <div style={{padding:"5%",fontSize:"large"}}>LNMIIT,Jaipur</div>
              
              </div>
            </div>
          </div>
          <div style={{display:"flex", justifyContent:"space-around",padding:"1%"}}>
          <div style={{height:"35vh",width:"35vh "}}>
              <div style={{height:"50%",width50:"50%",background:"white",borderRadius:"40px 40px 0px 0px"}}>
              <img src={boy} style={{width:"100%",height:"100%"}}></img>
              </div>
              <div style={{height:"50%",width50:"50%",background: "#F29040"
                  ,borderRadius:"0px 0px 40px 40px",padding:"3%",color:"black"}}>
                   <div style={{padding:"3%",fontWeight:"bolder",fontSize:"large"}}>Nikhil Gupta</div>
                   <div style={{padding:"3%"}}>2nd year CSE</div>
                   <div style={{padding:"5%",fontSize:"large"}}>LNMIIT,Jaipur</div>
              
              </div>
            </div>
            <div style={{height:"35vh",width:"35vh "}}>
              <div style={{height:"50%",width50:"50%",background:"white",borderRadius:"40px 40px 0px 0px"}}>
              <img src={khushi} style={{width:"100%",height:"100%"}}></img>
              </div>
              <div style={{height:"50%",width50:"50%",background: "#F29040"
                  ,borderRadius:"0px 0px 40px 40px",padding:"3%",color:"black"}}>
                   <div style={{padding:"3%",fontWeight:"bolder",fontSize:"large"}}>Khushi Singhal</div>
                   <div style={{padding:"3%"}}>2nd year CCE</div>
                   <div style={{padding:"5%",fontSize:"large"}}>LNMIIT,Jaipur</div>
              
              </div>
            </div>
           
          </div>
         
          </div>
          
        
         <div className='footer-box'>
          <Footer/>
        </div>
      </div>
    

   

  )
}

export default Team