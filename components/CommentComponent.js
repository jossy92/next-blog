import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment,faUpload } from '@fortawesome/free-solid-svg-icons'
import Comment from './Comment'
//import { useStateValue } from '../contextApi/StateProvider';
function CommentComponent({postId, comments, setNoOfComment}) {
   
    //const [{user}, dispatch ] = useStateValue ()
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const errStyle = { color: "red", fontSize: "12px" };
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [formStyle, setFormStyle] = useState({display:'none'})
    const [commentDisplay, setCommentDisplay] = useState(5)
  
  
    const [emailErr, setEmailErr] = useState();
    const [nameErr, setNameErr] = useState();
    const [commentErr, setCommentErr] = useState();
    const [showComment, setShowComment] = useState(false)
  
    useEffect(() => {
      setData(comments.data)
      
     }, [])

    

    const toggleFormDisplay = ()=>{
       
       if(formStyle.display==='none'){
        return(
            setFormStyle({display:'block'})
        )
       }else {
        return(
            setFormStyle({display:'none'})
        )
       }
      
     }

     const onSubmit = (e) => {
        e.preventDefault();
       const isValid = formValidation();
        if (isValid) {

            fetch(`${process.env.HOST_URL}/api/comments`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    post_id: postId,
                   name,
                   email,
                   comment
                })
                }) 
                .then(res=>res.json())
               .then(result =>{
                   const newData = [result.data,...data]
                   
                setData(newData)
                setNoOfComment(prevState=>prevState+1)
                 })
                 .catch(err => console.log(err));
                 setName('')
                 setEmail('')
                 setComment('')
      
            }
        }

        const deleteComment = (commentId)=>{
          const Delete = confirm('are you sure you want to delete this comment')
          if (Delete){
              fetch(`http://localhost:3000/api/comments?id=${commentId}`,{
              method:"delete",
              headers:{
                  "Content-Type":"application/json",
              }
          }).then(res=>res.json())
          .then(result=>{
             const newData = data.filter(item=>{
                 return item._id !== commentId
              })
              setData(newData)
              setNoOfComment(prevState=>prevState-1)
          })
          .catch(err=>{
              console.log(err)
          })
        }else{
            return
        }
      }
    
/*
    const moreComment = ()=>{
        setCommentDisplay((commentDisplay)=>commentDisplay+5)
      setShowComment(true)
    
    }


    useEffect(() => {
        if ( showComment) {
        axios.get(`http://localhost:5000/scholarship/${props.id}/comment`)
        .then(res=>{
            setData(res.data);
            setShowComment(false)
            setLoading(false);
        })
        .catch(err=>console.log(err))
        }
    }, [showComment, props.id])
*/

    const formValidation = () => {

        let emailErr = "";
        let commentErr = "";
        let nameErr = "";
        let isValid = true;

                    if (!email) {
                emailErr = 'Email address is required';
                isValid = false;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                emailErr = 'Email address is invalid';
                isValid = false;
            }

            if (!name) {
                nameErr = "Please provide name";
                isValid = false;
            }
            if (!comment) {
                commentErr = "Please enter comment";
                isValid = false;
            }
            setEmailErr(emailErr);
            setNameErr(nameErr);
            setCommentErr(commentErr);
            return isValid;

    }
    return (
        <Card  className='comment-card'>
        <Card.Header as="h5"> 
            <div className="comment-header">
                <div className="comment-header-left">
                    <strong >Comments</strong>
                </div>
                <div className="comment-header-right">
                    <button onClick={toggleFormDisplay} className="btn btn-primary btn-sm" id="btn-comment">
                    Post Comment<FontAwesomeIcon style={{width:'15px',height:'15px'}} icon={faComment} /></button>
                </div>
            </div>
           
        </Card.Header>
        <Card.Body>
     
        <Card.Title>
            
               
                <form className="row" style={formStyle} onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" value={email} className="form-control" name="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                        <div style={errStyle}>{emailErr}</div>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} className="form-control" name="name" placeholder="Enter First Name" onChange={(e) => setName(e.target.value)} required/>
                        <div style={errStyle}>{nameErr}</div>
                    </div>
                
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea className="form-control" name="comment" value={comment} placeholder="Enter comment" onChange={(e) => setComment(e.target.value)}
                            rows="3" required></textarea>
                       
                    </div>
                    <div style={errStyle}>{commentErr}</div>
                    <div className="text-right">
                     <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            
           
        </Card.Title>
        
        <div>
            {data.map(comment => <Comment key= {comment._id} comment={comment} deleteComment={deleteComment}/> )}

            {/*(commentDisplay >= data.length)?<button onClick={()=>moreComment()}  style={{display:'none'}}>See more comments</button> :<button onClick={()=>moreComment()} className="btn btn-primary" style={{display:'block'}}>See more comments</button>*/} 
          </div>
     
        </Card.Body>
    </Card>
    )
}

export default CommentComponent
