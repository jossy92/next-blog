
import {useState} from 'react';
import { useStateValue } from '../../contextApi/StateProvider';
import { actionTypes } from '../../contextApi/reducer';
import {useRouter} from 'next/router'
function AdminSignIn() {
    const router = useRouter();
    const [{user}, dispatch ] = useStateValue ()
    
    const [show, setShow] = useState(false);
    const [errorLogin, seterrorLogin] = useState('')
    
    const errStyle = { color: "red", fontSize: "12px" };
    const [loginErrStyle, setLoginErrStyle] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailErr, setEmailErr] = useState();
    const [passwordErr, setPasswordErr] = useState();
   // const [isLoading, setIsLoading] = useState(false)
   
   const onSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();

    if (isValid) {
    
        fetch('http://localhost:3000/api/auth',{
            method:'post',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
              
                email,
                password,
               
            })
            }) 
            .then(res=>res.json())
           .then(data =>{
               localStorage.setItem("jwt", data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({
                   type:actionTypes.Set_USER,
                   user: data.user
               })
             router.push('/')
           
             })
             .catch(err => console.log(err));
            
            }
     
    }
  

    const formValidation = () => {
        let emailErr = "";
        let passwordErr = "";
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
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        return isValid;
    }
   

    return (
        <div className="container admin-container">
        <div className="form-container">
        {/*<div style={loginErrStyle}>{errorLogin}</div>*/}
            <form onSubmit={onSubmit}>
                <h3 className="text-center">Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={email} className="form-control" placeholder="Enter email" onChange={(e) => {
                        setEmail(e.target.value)
                         seterrorLogin('')
                         setLoginErrStyle({display:'none'})
                        }} />
                    <div style={errStyle}>{emailErr}</div>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} className="form-control" placeholder="Enter password" onChange={(e) => {
                        setPassword(e.target.value)
                        seterrorLogin('')
                        setLoginErrStyle({display:'none'})
                        }} />
                </div>
                <div style={errStyle}>{passwordErr}</div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        </div>
    </div>
    )
}

export default AdminSignIn
