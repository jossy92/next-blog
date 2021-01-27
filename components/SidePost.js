import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser,faCalendar,faArrowRight,faEye } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/Link';
import moment from 'moment'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

function sidePost({sidePost,i}) {
    return (
        <ScrollAnimation animateIn="flipInY" delay={(i+1)*100} animateOnce>
        <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
        <div className="post-image">
            <div>
            <Link href={`/${sidePost._id}`}>
                <img src={sidePost.photo} alt="blog-1" className="img"/>
            </Link>
            </div>
            <div className="post-info flex-row">
                <span>{moment(sidePost.createdAt).format('MMMM Do, YYYY')}</span>
                <span><FontAwesomeIcon style={{color:'#3f4954',margin:'5px',width:'20px',height:'20px'}} icon={faEye} icon={faEye} />{sidePost.views}</span>
            </div>
        </div>
        <div className="post-title">
        <Link href={`/${sidePost._id}`}>
          <a >{sidePost.title}</a> 
        </Link>    
        </div>
    </div>
    </ScrollAnimation>
    )
}

export default sidePost
