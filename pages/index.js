import styles from '../styles/Home.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from '../components/Sidebar'
import Post from '../components/Post'
import fetch from "isomorphic-unfetch";
//import { WOW } from "wow.js";
import {useEffect,useState} from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import {useRouter} from 'next/router'
// your class declaration extending React.component...
const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "" }}
        onClick={onClick}
      />
    );
  }

export default function Index({posts,category}) {
    const router = useRouter();  
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(posts.data)
        new WOW().init()
    }, [])
     

    const settings = {
        autoplay: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed:5000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 960,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 560,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              },
              
            },
            {
                breakpoint: 320,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                },
                
              },
              {
                breakpoint: 0,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                },
                
              }
          ],
        nextArrow: <SampleNextArrow />,
       prevArrow: <SamplePrevArrow />
      };

      const deletePost = (postId)=>{
         const Delete = confirm('are you sure you want to delete this post');
             if(Delete){
            fetch(`${process.env.HOST_URL}/api/posts/${postId}`,{
                method:"delete",
                headers:{
                    "Content-Type":"application/json",
                }
            }).then(res=>res.json())
            .then(result=>{
               const newData = data.filter(item=>{
                   return item._id !== postId
                })
                setData(newData)
            })
            .catch(err=>{
                console.log(err)
            })
          }else{
              return
          }
       
    }
  return (
      <>
     
    <main>
        <section className="site-title">
            <div className="site-background wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".5s">
                <h3>Grace & Glory</h3>
                <h1>Amazing Places on Earth</h1>
                <button className="mybtn">Explore</button>
            </div>
        </section>
        <section>
            <div className="blog">
                <div className="container">
                <div className="blog-post">
                <Slider {...settings}>
                <div>
                <ScrollAnimation animateIn="fadeInLeft" delay={200}>
                    <div className="blog-content wow fadeRight" data-aos="fade-right" data-wow-delay="200">
                        <img src="/assets/Blog-post/blog7.png" alt="post-1" />
                        <div className="blog-title">
                            <h3>Men ought always to pray and not to faint</h3>
                               <button className="mybtn btn-blog" onClick={(e)=>router.push('/category?category=grace')}>Prayer</button>
                                <span>Apst. James</span>
                        </div>
                    </div>
                    </ScrollAnimation>
                </div>
                <div>
                <ScrollAnimation animateIn="fadeInUp" delay={200}>
                    <div className="blog-content " data-aos="fade-in" data-wow-delay="1s">
                        <img src="/assets/Blog-post/blog9.png" alt="post-2" />
                        <div className="blog-title">
                            <h3>Understanding The Mystery of the Kingdom</h3>
                            <button className="mybtn btn-blog" onClick={(e)=>router.push('/category?category=christianLiving')}>Kingdom</button>
                            <span>Praise Glory</span>
                        </div>
                    </div>
                    </ScrollAnimation>
                </div>
                <div>
                <ScrollAnimation animateIn="fadeInRight" delay={200}>
                    <div className="blog-content wow fadeLeft" data-aos="fade-left" data-wow-delay="1s">
                        <img src="/assets/Blog-post/blog8.png" alt="post-3" />
                        <div className="blog-title">
                            <h3>And let not your Beauty be that of only outward appearance</h3>
                            <button className="mybtn btn-blog" onClick={(e)=>router.push('/category?category=beautyForAshes')}>Unfading Beauty</button>
                            <span>Vivian Matthew</span>
                        </div>
                    </div>
                    </ScrollAnimation>
                </div>
                <div>
                <ScrollAnimation animateIn="fadeInUp" delay={200}>
                    <div className="blog-content" data-aos="fade-right" data-aos-delay="200">
                        <img src="/assets/Blog-post/faithseed.png" alt="post-4" />
                        <div className="blog-title">
                            <h3>If thou have faith as munstard seed</h3>
                            <button className="mybtn btn-blog" onClick={(e)=>router.push('/category?category=faith')}>Faith</button>
                            <span>Victor Michael</span>
                        </div>
                    </div>
                    </ScrollAnimation>
                </div>
                <div>
                <ScrollAnimation animateIn="fadeInUp" delay={200}>
                    <div className="blog-content" data-aos="fade-right" data-aos-delay="200">
                        <img src="/assets/Blog-post/post-5.png" alt="post-5" />
                        <div className="blog-title">
                            <h3>Walk in the Spirit and you will not gratify the desires of the flesh</h3>
                            <button className="mybtn btn-blog" onClick={(e)=>router.push('/category?category=spiritualGrowth')}>Spiritual Growth</button>
                            <span>Agbo Godswill</span>
                        </div>
                    </div>
                    </ScrollAnimation>
                </div>
                </Slider>
            </div>
       
                </div>
            </div>
        </section>
        <section className="container">
            <div className="site-content" >
                <div className="posts">
                   
                    { 
                        data.map(post=>  <Post key={post._id} frontPost={post} deletePost={deletePost}/>)
                    }
                   <ScrollAnimation animateIn="zoomIn" delay={200}>
                    <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
                        <div className="post-image">
                            <div>
                                <img src="/assets/Blog-post/blog1.png" alt="blog-1" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                <span><i className="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2020</span>
                                <span>2 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a href="#">The man God uses must make no excuse for failure</a> 
                          <p>Lorem 
                              ipsum dolor, sit amet consectetur adipisicing elit.
                               Tempora a magnam labore deserunt id dicta non deleniti 
                               odit eveniet excepturi, harum nobis quae veritatis distinctio
                                porro. Facere ea porro incidunt assumenda quaerat ipsa commodi 
                                quo ratione quis, beatae numquam dolor?
                            </p>
                            <button className="btn post-btn">Read More &nbsp; <i className="fas fa-arrow-right"></i> </button>
                        </div>
                    </div>
                    <hr/>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="zoomIn" delay={200}>
                    <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
                        <div className="post-image">
                            <div>
                                <img src="/assets/Blog-post/blog2.png" alt="blog-1" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                <span><i className="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 16, 2020</span>
                                <span>5 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a href="#">The mystery of Faith: Faith without works is dead</a> 
                          <p>Lorem 
                              ipsum dolor, sit amet consectetur adipisicing elit.
                               Tempora a magnam labore deserunt id dicta non deleniti 
                               odit eveniet excepturi, harum nobis quae veritatis distinctio
                                porro. Facere ea porro incidunt assumenda quaerat ipsa commodi 
                                quo ratione quis, beatae numquam dolor?
                            </p>
                            <button className="mybtn post-btn">Read More &nbsp; <i className="fas fa-arrow-right"></i> </button>
                        </div>
                    </div>
                    <hr/>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="zoomIn" delay={200}>
                    <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
                        <div className="post-image">
                            <div>
                                <img src="/assets/Blog-post/blog3.png" alt="blog-1" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                <span><i className="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;March 14, 2020</span>
                                <span>10 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a href="#">The Power of Prayer and the Mystery of Praying in Tongues</a> 
                          <p>Lorem 
                              ipsum dolor, sit amet consectetur adipisicing elit.
                               Tempora a magnam labore deserunt id dicta non deleniti 
                               odit eveniet excepturi, harum nobis quae veritatis distinctio
                                porro. Facere ea porro incidunt assumenda quaerat ipsa commodi 
                                quo ratione quis, beatae numquam dolor?
                            </p>
                            <button className="btn post-btn">Read More &nbsp; <i className="fas fa-arrow-right"></i> </button>
                        </div>
                    </div>
                    <hr/>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="zoomIn" delay={200}>
                    <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
                        <div className="post-image">
                            <div>
                                <img src="/assets/Blog-post/blog4.png" alt="blog-4" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                <span><i className="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;June 13, 2020</span>
                                <span>4 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a href="#">Kingdom Economics: Gods Principle for Finnancial Victory</a> 
                          <p>Lorem 
                              ipsum dolor, sit amet consectetur adipisicing elit.
                               Tempora a magnam labore deserunt id dicta non deleniti 
                               odit eveniet excepturi, harum nobis quae veritatis distinctio
                                porro. Facere ea porro incidunt assumenda quaerat ipsa commodi 
                                quo ratione quis, beatae numquam dolor?
                            </p>
                            <button className="btn post-btn">Read More &nbsp; <i className="fas fa-arrow-right"></i> </button>
                        </div>
                    </div>
                  </ScrollAnimation>
                </div>
                <Sidebar posts={posts} category={category} />
                
            </div>
        </section>
      </main>
                
   </>

  )
}

Index.getInitialProps = async ()=>{
    const [posts, category] = await Promise.all([
     fetch(`${process.env.HOST_URL}/api/posts`).then(r=>r.json()),
     fetch(`${process.env.HOST_URL}/api/category`).then(r=>r.json()),
    ])
   
    return { posts, category }
    
}

