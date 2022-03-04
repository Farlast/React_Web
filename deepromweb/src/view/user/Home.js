import React from 'react'
import { useNavigate }  from 'react-router-dom'
import Footer from 'components/Footer'
import HomeNavbar from 'components/HomePage/HomeNavbar'

function Home() {
    let navigate = useNavigate();
    return (
        <div>
           <HomeNavbar/>
        <div>
            <button className='btn btn-success' onClick={() => navigate("/admin")}> <i className="far fa-times-circle"></i> Backend </button>
        </div>
        <Footer/>
        </div>
    )
}
export default Home