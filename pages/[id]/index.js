import {useState, useEffect} from 'react';
import {useRouter} from 'next/router'
import Post from '../../components/Post'
import Sidebar from '../../components/Sidebar'

function Index({post,posts,category,comments}) {

    return (
        <main>
        <section className="container">
            <div className="site-content" >
                <div className="posts">
                     <Post content post={post} comments={comments} />
                </div>
                     <Sidebar posts={posts} category={category} />
                 
            </div>
        </section>
        </main>
    )
}


Index.getInitialProps = async ({ query: { id}})=>{

    const [post,posts, category,comments] = await Promise.all([
         fetch(`${process.env.HOST_URL}/api/posts/${id}`).then(r=>r.json()),
         fetch(`${process.env.HOST_URL}/api/posts`).then(r=>r.json()),
        fetch(`${process.env.HOST_URL}/api/category`).then(r=>r.json()),
        fetch(`${process.env.HOST_URL}/api/comments?post_id=${id}`).then(r=>r.json()),
       ])
      
    
       return { post,posts, category,comments }
    
    
    
}


export default Index
