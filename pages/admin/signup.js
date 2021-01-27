import {useState} from 'react';

import {useRouter} from 'next/router'
function SignUp() {
    const router = useRouter();

    const errStyle = { color: "red", fontSize: "12px" };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [emailErr, setEmailErr] = useState();
    const [passwordErr, setPasswordErr] = useState();
    const [nameErr, setNameErr] = useState();
   

    
    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if (isValid) {
  
     fetch('http://localhost:3000/api/signup',{
        method:'post',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            name,
            email,
            password,
           
        })
        }) 
        .then(res=>res.json())
       .then(data =>{
           console.log(data)
       router.push('/admin/signin')
         })
         .catch(err => console.log(err));
        
        }
      
    }
    const formValidation = () => {

        let emailErr = "";
        let passwordErr = "";
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
        if (!password) {
            passwordErr = 'Password is required';
            isValid = false;
        }
        if (!name) {
            nameErr = "Please provide name";
            isValid = false;
        }
       
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        setNameErr(nameErr);
        return isValid;

    }

    return (
        <div className="container admin-container">
            <div className="form-container">
                <form onSubmit={onSubmit}>
                    <h3 className="text-center">Create Admin</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" value={email} className="form-control" name="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        <div style={errStyle}>{emailErr}</div>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} className="form-control" name="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                        <div style={errStyle}>{nameErr}</div>
                    </div>
                   
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} className="form-control" name="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div style={errStyle}>{passwordErr}</div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <h5 style={{margin:'20px'}} onClick={()=> router.push('/admin/signin')}>
                    Already have an account? Signin
                </h5>
                </form>
            </div>
        </div>
    )
}

export default SignUp
