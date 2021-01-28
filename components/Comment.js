import TimeAgo from 'timeago-react';
import { useEffect, useState } from "react"
//import { useStateValue } from '../contextApi/StateProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Comment({comment, deleteComment}) {
    
   // const [{user}, dispatch ] = useStateValue ()
    const [shortCommentStyle, setShortCommentStyle] = useState({display: 'block', fontWeight:'lighter'})
    const [longCommentStyle, setLongCommentStyle] = useState({display: 'none'})
  
  const longComment = ()=>{
    return( (comment.comment?.length>100)?(
    <div>
      <p style={shortCommentStyle}>{comment.comment.substring(0,100)}<span style={{cursor:'pointer'}} onClick={()=>showMore()}><strong>  ...Read more</strong></span> </p>
      <p style={longCommentStyle}>{comment.comment}<span  style={{cursor:'pointer'}} onClick={()=>showMore()}><strong>  ...Read less</strong></span></p>
    </div> 
    ):<p style={{fontWeight:'lighter'}}>{comment.comment}</p>)
    
  }
  const showMore=()=>{
      if(shortCommentStyle.display==='none'){
        setShortCommentStyle({display:'block',fontWeight:'lighter'})
        setLongCommentStyle({display:'none'})
      }else{
        setShortCommentStyle({display:'none'})
        setLongCommentStyle({display:'block',fontWeight:'lighter'})
        
      }
   
  }
    return (
        <>      
   
     <div className='user_comments'>
        <img className="img-circle" src={`https://ui-avatars.com/api/?name=${comment.name}&background=0D8ABC&color=fff&rounded=true`} alt={comment.name} />
          <div className='user_details mr-auto'>
            <strong style={{fontSize:'1em',color:'#0275d8'}} >{comment.name}</strong> <span className='user_email' >{comment.email}-</span><small className="text-muted">
                    <TimeAgo datetime={comment.timestamp}/></small>
                    <br/>{longComment()}
                  
          </div>
          
     </div>
   <hr />
</>
    )
}

export default Comment
