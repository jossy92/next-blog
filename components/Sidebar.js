import {useState} from 'react'
import SidePost from './SidePost'
import Link from 'next/link';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

function Sidebar({posts,category}) {
    const errStyle = { color: "red", fontSize: "12px" };
   
    const [email, setEmail] = useState("");
     const [emailErr, setEmailErr] = useState();
    
    const subscribe = ()=>{
        if (!email) {
           setEmailErr('Email address is required');
            return
        }else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailErr('Email address is invalid');
            return
        }

        fetch('http://localhost:3000/api/subscriber',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                   email,
                })
                }) 
                .then(res=>res.json())
               .then(result =>{
                  console.log(result)
                   setEmail('')
                 })
                 .catch(err => console.log(err));
      
            }
    
    return (
        <>
        
        <aside className="sidebar">
                   <div className="category">
                       <h2>Category</h2>
                       <ul className="category-list" id='category'>
                           
                            <ScrollAnimation animateIn="fadeInRight" delay={100} animateOnce>
                                <Link href="/category?category=faith"> 
                                    <li className="list-items" data-aos="fade-left" data-aos-delay="100">
                                        <a >Faith</a>
                                        <span>({category.data.faith?.length})</span>
                                    </li>
                                </Link>
                            </ScrollAnimation>
                           
                           
                            <ScrollAnimation animateIn="fadeInRight" delay={200} animateOnce>
                            <Link href="/category?category=beautyForAshes"> 
                                <li className="list-items" data-aos="fade-left" data-aos-delay="300" >
                                    <a >Beauty For Ashes</a>
                                    <span>({category.data.beautyForAshes?.length})</span>
                                </li>
                                </Link>
                            </ScrollAnimation>
                           
                          
                            <ScrollAnimation animateIn="fadeInRight" delay={300} animateOnce>
                            <Link href="/category?category=christianLiving">    
                                <li className="list-items" data-aos="fade-left" data-aos-delay="500">
                                    <a >Christian Living</a>
                                    <span>({category.data.christianLiving?.length})</span>
                                </li>
                                </Link>
                            </ScrollAnimation>
                          
                           
                            <ScrollAnimation animateIn="fadeInRight" delay={400} animateOnce>
                                 <Link href="/category?category=spiritualGrowth"> 
                                <li className="list-items" data-aos="fade-left" data-aos-delay="700">
                                    <a>Spiritual Growth</a>
                                    <span>({category.data.spiritualGrowth?.length})</span>
                                </li>
                                </Link>
                            </ScrollAnimation>
                           
                            
                                <ScrollAnimation animateIn="fadeInRight" delay={500} animateOnce>
                                <Link href="/category?category=grace"> 
                                    <li className="list-items" data-aos="fade-left" data-aos-delay="500">
                                        <a >Grace</a>
                                        <span>({category.data.grace?.length})</span>
                                    </li>
                                    </Link>
                                </ScrollAnimation>
                           
                       </ul>
                   </div>
                   <div className="popular-post">
                       <h2>Popular Post</h2>
                       {
                        posts.data.sort((a, b) =>a.views < b.views ? 1 : -1)
                        .map((post,i)=>  <SidePost i={i} key={post._id} sidePost={post} />)
                    }
                     <ScrollAnimation animateIn="flipInY" delay={200} animateOnce>
                       <div className="post-content" data-aos="flip-up" data-aos-delay="200">
                        <div className="post-image">
                            <div>
                                <img src="/assets/popular-post/m-blog-1.jpg" alt="blog-1" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2020</span>
                                <span>2 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a >Efficacy of the Blood: The way to Victory</a> 
                         
                        </div>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="flipInY" delay={300} animateOnce>
                    <div className="post-content" data-aos="flip-up" data-aos-delay="300">
                        <div className="post-image">
                            <div>
                                <img src="/assets/popular-post/m-blog-2.jpg" alt="blog-1" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 02, 2020</span>
                                <span>2 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a >The Victory that Overcomes the World</a> 
                         
                        </div>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="flipInY" delay={400} animateOnce>
                    <div className="post-content" data-aos="flip-up" data-aos-delay="400">
                        <div className="post-image">
                            <div>
                                <img src="/assets/popular-post/m-blog-3.jpg" alt="blog-1" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 16, 2020</span>
                                <span>9 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a >Overcoming the Flesh: Triumphing over the Old Man</a> 
                         
                        </div>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="flipInY" delay={500} animateOnce>
                    <div className="post-content" data-aos="flip-up" data-aos-delay="500">
                        <div className="post-image">
                            <div>
                                <img src="/assets/popular-post/m-blog-4.jpg" alt="blog-1" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;February 14, 2020</span>
                                <span>7 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a >Kingdom Economics: The Pathway to Financial Freedom</a> 
                         
                        </div>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="flipInY" delay={600} animateOnce>
                    <div className="post-content" data-aos="flip-up" data-aos-delay="600">
                        <div className="post-image">
                            <div>
                                <img src="/assets/popular-post/m-blog-5.jpg" alt="blog-1" className="img"/>
                            </div>
                            <div className="post-info flex-row">
                                
                                <span><i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;May 16, 2020</span>
                                <span>9 comments</span>
                            </div>
                        </div>
                        <div className="post-title">
                          <a >Overcoming the Flesh: Triumphing over the Old Man</a> 
                         
                        </div>
                    </div>
                    </ScrollAnimation>
                   </div>
                   <ScrollAnimation animateIn="bounceIn" delay={500} >
                   <div className="newsletter" data-aos="fade-up" data-aos-delay="300">
                       <h2>Newsletter</h2>
                       <div className="form-element">
                           <input type="text" value={email} className="input-element" placeholder="Email" onBlur={e=> setEmailErr('')}
                              
                             onChange={(e)=>setEmail(e.target.value)}/>
                           <div style={errStyle}>{emailErr}</div>
                           <button className="btn form-btn" onClick={subscribe}>
                               Subscribe
                           </button>
                       </div>
                   </div>
                   </ScrollAnimation>
                   <div className="popular-tags">
                       <h2>Popular Tags</h2>
                       <div className="tags flex-row">
                       <ScrollAnimation className="tag" animateIn="flipInX" delay={100}>
                           Love
                        </ScrollAnimation>
                        <ScrollAnimation className="tag" animateIn="flipInX" delay={200}>
                          faith
                        </ScrollAnimation>
                        <ScrollAnimation className="tag" animateIn="flipInX" delay={300}>
                           wisdom
                        </ScrollAnimation>
                        <ScrollAnimation className="tag" animateIn="flipInX" delay={400}>
                           purpose
                        </ScrollAnimation>
                        <ScrollAnimation className="tag" animateIn="flipInX" delay={500}>
                           discipleship
                        </ScrollAnimation>
                        <ScrollAnimation className="tag" animateIn="flipInX" delay={600}>
                           prayer
                        </ScrollAnimation>
                        <ScrollAnimation className="tag" animateIn="flipInX" delay={700}>
                          prophecy
                        </ScrollAnimation>
                        <ScrollAnimation className="tag" animateIn="flipInX" delay={800}>
                           character
                        </ScrollAnimation>
                       </div>
                   </div>
                </aside>

</>
    )
}


export default Sidebar
