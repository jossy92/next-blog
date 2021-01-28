import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser,faCalendar,faArrowRight,faEye,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/Link';
import moment from 'moment'
import CommentComponent from './CommentComponent'

import { useState, useEffect } from 'react';
//import { useStateValue } from '../contextApi/StateProvider';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

function Post({post,frontPost,content,comments,deletePost}) {

    const [noOfComment, setNoOfComment]=useState('')
    const [views, setViews]=useState('')

    useEffect(() => {
      if(content){
        setNoOfComment(comments.data?.length)
        setViews(post.data.views+1)
        fetch(`http://localhost:3000/api/posts/${post.data._id}`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
            views:1
                
            })
            }) 
            .then(res=>res.json())
           .then(data =>{
              // console.log(data)
           
             })
             .catch(err => console.log(err));
      } 
    
        
  }, [])
  
    return content ? (
        <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
        <div className="post-image">
            <div>
                <img src={post.data.photo} alt="blog-1" className="img"/>
            </div>
            <div className="post-info flex-row">
                <span><FontAwesomeIcon className='font' style={{color:'#3f4954',margin:'5px',width:'20px',height:'20px'}} icon={faUser} />&nbsp;&nbsp;{post.data?.author}</span>
                <span><FontAwesomeIcon className='font' style={{color:'#3f4954',margin:'5px',width:'20px',height:'20px'}} icon={faCalendar} />&nbsp;&nbsp;{moment(post.data?.createdAt).format('MMMM Do, YYYY')}</span>
                <span>{noOfComment && noOfComment} comments</span>
                 <span><FontAwesomeIcon className='font' style={{color:'#3f4954',margin:'5px',width:'20px',height:'20px'}} icon={faEye} />{views}</span>
            </div>
        </div>
        <div className="post-title">
          <a href="#">{post.data?.title}</a> 
          <p style={{whiteSpace: "pre-line"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.data?.body}
            </p>
           
        </div>
        <CommentComponent postId={post.data?._id} comments={comments} setNoOfComment={setNoOfComment} />
    </div>
    ): (<>
    <ScrollAnimation animateIn="zoomIn">
    <div className="post-content" data-aos="zoom-in" data-aos-delay="200">
    <div className="post-image">
        <div>
            <img src={frontPost.photo} alt="blog-1" className="img"/>
        </div>
        <div className="post-info flex-row">
            <span><FontAwesomeIcon style={{color:'#3f4954',width:'20px',height:'20px'}} icon={faUser} />&nbsp;&nbsp;{frontPost.author}</span>
            <span><FontAwesomeIcon style={{color:'#3f4954',width:'20px',height:'20px'}} icon={faCalendar} />&nbsp;&nbsp;{moment(frontPost.createdAt).format('MMMM Do, YYYY')}</span>
            <span><FontAwesomeIcon style={{color:'#3f4954',width:'20px',height:'20px'}} icon={faEye} />{frontPost.views} </span>
        </div>
    </div>
    <div className="post-title">
      <a href="#">{frontPost.title}</a> 
      <p>{frontPost.body.substring(0,200)} ...
        </p>
        <Link href={`/${frontPost._id}`}><button className="mybtn post-btn">Read More &nbsp; <FontAwesomeIcon style={{color:'#3f4954',margin:'5px',width:'20px',height:'20px'}} icon={faArrowRight} /></button></Link>
    </div>
</div><hr />
</ScrollAnimation>
</>
)
}

export default Post
