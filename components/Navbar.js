
import Link from 'next/Link';
import {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {   faTwitter, faFacebook, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';
//import { actionTypes } from '../contextApi/reducer';
//import { useStateValue } from '../contextApi/StateProvider';
import {useRouter} from 'next/router'

const Navbar = () =>{
  const router = useRouter();
 
 
    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-white">
          
           <div className="nav-brand">
              <Link href="/">
                  <a  className='text-gray'>Blogger</a>
              </Link>
              
          </div>
    
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse  navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto ml-auto nav-items">
            <li className="nav-item active">
            <Link href='/'><a className="nav-link" >Home<span className="sr-only">(current)</span></a></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://justbuy.netlify.app">Website</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Category
              </a>
              <ul style={{paddingLeft:'10px'}} className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li> <Link className="dropdown-item" href="/category?category=faith">Faith</Link></li>
                  <li><Link className="dropdown-item" href="/category?category=beautyForAshes">Beauty For Ashes </Link></li>
                  <li><Link className="dropdown-item" href="/category?category=christianLiving"> Christian Living</Link></li>
                  <li><Link className="dropdown-item" href="/category?category=spiritualGrowth">Spiritual Growth</Link></li>
                  <li><Link className="dropdown-item" href="/category?category=grace">Grace</Link></li>
              
              </ul>
            </li>
            <li className="nav-link">
                <a href="#about">About Us</a>
            </li>
            {/*
            <li className="nav-link">
                <a href="#">Contact Us</a>
            </li>
            */}
          </ul>
        
        <div className="social text-gray">
          <FontAwesomeIcon className='text-gray' style={{margin:'5px',width:'20px',height:'20px'}} icon={faFacebook} />
          <FontAwesomeIcon className='text-gray' style={{margin:'5px',width:'20px',height:'20px'}} icon={faTwitter} />
          <FontAwesomeIcon className='text-gray' style={{margin:'5px',width:'20px',height:'20px'}} icon={faInstagram} />
          <FontAwesomeIcon className='text-gray' style={{margin:'5px',width:'20px',height:'20px'}} icon={faYoutube} />
          </div>
      </div>
    </nav>
    
  
   )
}
export default Navbar