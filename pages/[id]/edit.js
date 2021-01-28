
import {useState} from 'react';
import {useRouter} from 'next/router'

function EditPost({post}) {
       //Checks Fields
       const router = useRouter();  
       const [title, setTitle] = useState(post.title);
       const [content, setContent] = useState(post.body);
       const [author, setAuthor] = useState(post.author);
       const [image, setImage] = useState();
       const [category, setCategory] = useState(post.category);
       
   
   
       //Checks Errors
       const [titleErr, setTitleErr] = useState();
       const [contentErr, setContentErr] = useState();
       const [authorErr, setAuthorErr] = useState();
      const [imageErr, setImageErr] = useState();
       const [categoryErr, setCategoryErr] = useState();
    
   const errStyle = { color: "red", fontSize: "12px" };
 

    //Handle form Validation
    const formValidation = () => {
        let titleErr = "";
        let contentErr = "";
        let authorErr = "";
        let imageErr = "";
        let categoryErr = "";
      
        let isValid = true;
        if (!title) {
            titleErr = "Title cannot be empty";
            isValid = false;
        }
        if (!author) {
            authorErr = "Author is required";
            isValid = false;
        }
        if (!content) {
            contentErr = "Content cannot be empty";
            isValid = false;
        }

        
        if (!category) {
            categoryErr = "Please select a category";
            isValid = false;
        }
       // if (!image) {
         //   imageErr = "Please provide an Image for this post";
           // isValid = false;
       // }
      //  if (!image) {
        //    imageErr = "Please select an image";
          //  isValid = false;
      //  }
        setTitleErr(titleErr);
        setContentErr(contentErr);
        //setImageErr(imageErr);
        setCategoryErr(categoryErr);
        setAuthorErr(authorErr);

        return isValid;
    }
    
       
       
    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();

        if (isValid && image) {
            
       
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "instaclone")
          data.append("cloud_name", "jossyjoe")
           fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload",{
             method: "post",
             body: data
           })
           .then(res=>res.json())
           .then(data=>{
         
             postDetails(data.url)
            
           })
           .catch(err=>{
             console.log(err)
           })

        }else{
            fetch(`${process.env.HOST_URL}/api/posts/${post._id}`,{
      method:'PUT',
      headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
          title,
          author,
          body:content,
          category
        
      })
        })
        .then(res=>res.json())
     .then(data =>{
        router.push('/')
     
       })
       .catch(err => console.log(err));
    }
    }
    const postDetails = (data)=>{
  
     fetch(`${process.env.HOST_URL}/api/posts/${post._id}`,{
      method:'PUT',
      headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
          title,
          author,
          body:content,
          category,
          photo:data
      })
      }) 
      .then(res=>res.json())
     .then(data =>{
        router.push('/')
     
       })
       .catch(err => console.log(err));
      
    
}
const updatePic = (file)=>{
   
    if(file.name.substring(file.name.length - 3, file.name.length) === 'jpg' || file.name.substring(file.name.length - 3, file.name.length) === 'png'){
        setImage(file)
    }else{
        setImage(null)
       setImageErr('only image files can be uploaded')
       
    }
  
    
}
    return (
       
  
        <div className="container admin-container">

            <div className="form-box">

                <form onSubmit={onSubmit}>

                    <h1 className="text-center">Update Post</h1>

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" placeholder="Enter title" value={title} onChange={(e) => {
                            setTitle(e.target.value);
                        }} />
                        <div style={errStyle}>{titleErr}</div>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <input type="text" className="form-control" name="author" placeholder="Enter title" value={author} onChange={(e) => {
                            setAuthor(e.target.value);
                        }} />
                        <div style={errStyle}>{authorErr}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" id="icontent" name="content" rows="10" value={content} onChange={(e) => {
                            setContent(e.target.value);
                        }} wrap='hard'></textarea>
                        <div style={errStyle}>{contentErr}</div>
                    </div>
                  
                    <br />
                    <div className="form-group">
                        <label htmlFor="department">Select Category</label>
                        <select className="form-control" name="department" id="department" onChange={(e) => {
                            setCategory(e.target.value);
                        }} value={category}>
                             <option value=''>Select Category</option>
                            <option value="faith">Faith</option>
                            <option value="beautyForAshes">Beauty For Ashes</option>
                            <option value="christianLiving">Christian Living</option>
                            <option value="spiritualGrowth">Spiritual Growth</option>
                            <option value="Grace">Grace</option>
                        </select>
                        <div style={errStyle}>{categoryErr}
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="imagefile">Image File</label>
                        <input type="file" name="uploaded_file"  className="form-control-file" id="imagefile" onChange={e=>updatePic(e.target.files[0])
                        } />
                        <div style={errStyle}>{imageErr}
                        </div>
                    </div>
                   
                    <button type="submit" className="btn btn-primary btn-block">Update</button>

                </form>
            </div>
        </div>
    


    )
}


EditPost.getInitialProps = async ({ query: { id}})=>{

    const res = await fetch(`${process.env.HOST_URL}/api/posts/${id}`)
    const {data} = await res.json();

       return { post:data }
    
    
    
}
export default EditPost
