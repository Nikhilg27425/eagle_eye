import './App.css';
import './Navbar'
import Navbar from './Navbar';
import mainimg from './main 1.png'
import Footer from './Footer';
import Home from './Home';
import Model1 from './Model1';
import Model2 from './Model2';
import Model3 from './Model3';
import Team from './Team';
import {Routes,Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  return (
    
    
   <div className="App">
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/model3'element={<Model3/>}> </Route>
    <Route path='/model1'element={<Model1/>}></Route>
    <Route path='/model2' element={<Model2/>}></Route>
    <Route path='/team' element={<Team/>}></Route>

  </Routes>
  
  {location.pathname==='/' &&(
    <div className="App-wrapper ">
      <div className="navbarbox">
        <Navbar></Navbar>
      
        </div>
        <div className='mainbox'>
          <img className='img-main' src={mainimg}></img>
          <div className='text-box'>
            <div  className='main-head'>
            <h1 style={{textAlign:'left'}} >EAGLE'S EYE</h1>
            </div>
           <div className='head' > <p>Leveraging advanced AI and machine learning, our models detect, predict, and prevent crimes in real-time, empowering communities with cutting-edge protection against large-scale threats</p></div>
           <div className='buttons'>
           <div className='button' style={{margin:"2%"}}>Know More</div>
            <div className="button" style={{margin:"2%"}}>Watch Video </div>
            </div>
          
          </div>
        </div>
        <div className='footer-box'>
          <Footer/>
        </div>
      </div>)}


    </div>
   
  );
}

export default App;
