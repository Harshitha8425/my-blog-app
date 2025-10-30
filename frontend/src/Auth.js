import React,{useState} from "react";
import {useNavigate} from "react-router-dom"
import './AuthPage.css';
export default function AuthPage()
{
    const [registerName,setRegisterName]=useState('');
    const [registerEmail,setRegisterEmail]=useState('');
    const [registerPassword,setRegisterPassword]=useState('');

    const [loginEmail,setLoginEmail]=useState('');
    const [loginPassword,setLoginPassword]=useState('');
    const navigate=useNavigate();

    const[message,setMessage]=useState('');
     const handleRegister=async(event) => {
        event.preventDefault();
        try{
            const response=await fetch('https://my-blog-app-backend-yfwo.onrender.com/api/auth/register',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name:registerName,email:registerEmail,password:registerPassword})
            })
            const result=await response.json();
            setMessage(result.message)
        }
        catch(error){
            setMessage('An Error occured during registration')
        }
     }
     const handleLogin=async(event)=>{
        event.preventDefault();
        try{
            const response=await fetch('https://my-blog-app-backend-yfwo.onrender.com/api/auth/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email:loginEmail,password:loginPassword})
            })
            const result=await response.json();
            if(result.token){
                localStorage.setItem('token',result.token);
                navigate('/');
            }
            else{
                setMessage(result.message);
            }
        }
        catch(error) {
            setMessage('An Error Occured During Login');
        }
     }

    return(
        <div className="auth-body">
        <div className="auth-container">
            <div className="form-section authform">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input 
                         type="text" 
                         placeholder="Your Name"
                          value={registerName}
                          onChange={(e)=>setRegisterName(e.target.value)} 
                          required /> <br></br>
                     <input type="email" 
                         placeholder="Your Email"
                          value={registerEmail}
                          onChange={(e)=>setRegisterEmail(e.target.value)} 
                          required /> <br></br> 
                      <input 
                         type="password" 
                         placeholder="Your Password"
                          value={registerPassword}
                          onChange={(e)=>setRegisterPassword(e.target.value)} 
                          required /> <br></br>
                          <button type="submit">Register</button>       
                </form>
            </div>
            <div className="form-section authform">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                     <input 
                         type="email" 
                         placeholder="Your Email"
                          value={loginEmail}
                          onChange={(e)=>setLoginEmail(e.target.value)} 
                          required /> <br></br> 
                      <input 
                         type="password" 
                         placeholder="Your Password"
                          value={loginPassword}
                          onChange={(e)=>setLoginPassword(e.target.value)} 
                          required /> <br></br>
                          <button type="submit">Login</button>       
                </form>
            </div>
            <p>{message}</p>
        </div>
        </div>
    )
}
