import React from "react";
import {Outlet} from 'react-router-dom'
import Navbar from './Components/Navbar/navbar'
import Footer from './Components/Footer/footer'
import Hero from './Components/Hero/hero'
import Model_one from './Components/Model_one/one'
import Model_two from './Components/Model_two/two'
import Model_three from './Components/Model_three/three'


function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
            {/* <Hero/>
            <Footer/>  */}
        </>
    )
}

export default Layout