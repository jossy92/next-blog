import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {   faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight,faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

function Footer() {
    const[top,setTop] = useState(null)
    return (
        <footer className="footer">
        <div className="container" id='about'>
        <ScrollAnimation animateIn="fadeInLeft" delay={200}>
            <div className="about-us" data-aos="fade-right" data-aos-delay="200">
                <h2>About Us</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In facilis harum 
                    debitis aut optio autem animi cumque doloribus saepe explicabo!</p>
            </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInLeft" delay={200}>
            <div className="newsletter" data-aos="fade-right" data-aos-delay="200">
                <h2>Newsletter</h2>
                <p>Stay Updated with our latest</p>
                <div className="form-element">
                    <input type="text" placeholder="email"/><span> <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faChevronRight} /></span>
                </div>
            </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInRight" delay={200}>
            <div className="instagram" data-aos="fade-left" data-aos-delay="200">
                <h2>Instagram</h2>
                <div className="flex-row">
                    <img src="/assets/instagram/thumb-card3.png" alt="insta1" />
                    <img src="/assets/instagram/thumb-card4.png" alt="insta1" />
                    <img src="/assets/instagram/thumb-card5.png" alt="insta1" />
                    <img src="/assets/instagram/thumb-card6.png" alt="insta1" />
                    <img src="/assets/instagram/thumb-card7.png" alt="insta1" />
                    <img src="/assets/instagram/thumb-card8.png" alt="insta1" />
                </div>
            </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInRight"delay={200}>
            <div className="follow" data-aos="fade-left" data-aos-delay="200">
                <h2>Follow</h2>
                <p>Let us be Social</p>
                <div>
                <FontAwesomeIcon style={{color:'white',margin:'5px',width:'25px',height:'25px'}} icon={faFacebook} />
                  <FontAwesomeIcon style={{color:'white',margin:'5px',width:'25px',height:'25px'}} icon={faTwitter} />
                  <FontAwesomeIcon style={{color:'white',margin:'5px',width:'25px',height:'25px'}} icon={faInstagram} />
                  <FontAwesomeIcon style={{color:'white',margin:'5px',width:'25px',height:'25px'}} icon={faYoutube} />
                </div>
            </div>
            </ScrollAnimation>
        </div>
        <div className="rights flex-row">
            <h4 className="text-grey">
                Copyright &copy; 2020 All rights reserved | made by
                <a href="google.com" target="_black">Jossy Joe  <FontAwesomeIcon style={{color:'white',margin:'5px',width:'25px',height:'25px'}} icon={faFacebook} />facebook</a>
            </h4>
        </div>
        <div className="move-up" onClick={()=>window.scrollTo({top:0, behavior: 'smooth'})}>
            <span> <FontAwesomeIcon style={{color:'#104f55',margin:'5px', width:'30px',height:'30px'}} icon={faArrowCircleUp} /></span>
        </div>
    </footer>
    )
}

export default Footer
