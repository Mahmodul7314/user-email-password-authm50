/* eslint-disable react/jsx-no-undef */
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] =useState("");
    const emailRef = useRef(null);


const handleLogin = e =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

        //reset error or success message (clear)
        setRegisterError('');
        setSuccess('');

    // Login or Sign In with Email and Password
    signInWithEmailAndPassword(auth,email, password)
    .then(result =>{
        console.log(result.user)
        if(result.user.emailVerified){
            setSuccess('User Logged in Successfull')
        }else{
            alert("Please verify your email address")
        }
    })
    .catch(error =>{
        console.log(error)
        setRegisterError(error.message);
    })
    
}

const handleForgetPassword = () =>{
    const email = emailRef.current.value;
    if(!email){
        console.log('Please provide an email', emailRef.current.value)
        return
    }else if( !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        console.log('Pleae write a valid email');
        return;
    }

    //send validation email
    sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Please check you email')
        })
        .catch(error =>{
            console.log(error)
        })
 
  
}

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <form onSubmit={handleLogin} >
                <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" 
                name="email" 
                ref={emailRef}
                placeholder="email" 
                className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                <label className="label">
                    {/* handleForgetPassword */}
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
                </form>
                {registerError && <p className="text-3xl text-red-700">{registerError}</p>
           
               }
            {
              success && <p className="text-3xl text-green-600">{success}</p>

              }
              <p>New to this website? Please <Link className="font-bold" to="/register">Register</Link></p>
        
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;