import styles from '../styles/Home.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from '../components/Sidebar'

import Post from '../components/Post'
import fetch from "isomorphic-unfetch";
//import { WOW } from "wow.js";
import {useEffect} from 'react'

export default function Index({posts,category}) {
   
 


  return (
      <>
     
    <main>
        
       
        <section className="container">
            <div className="site-content" >
                <div className="posts">
                   
                    { 
                        posts.data.map(post=>  <Post key={post._id} frontPost={post} />)
                    }
                   
                   
                </div>
                <Sidebar posts={posts} category={category} />
                
            </div>
        </section>
      </main>
                
   </>

  )
}

Index.getInitialProps = async ({query})=>{
  
    const [posts, category] = await Promise.all([
     fetch(`${process.env.HOST_URL}/api/posts?category=${query.category}`).then(r=>r.json()),
     fetch(`${process.env.HOST_URL}/api/category`).then(r=>r.json()),
    ])
   
    return { posts, category }
    
}

