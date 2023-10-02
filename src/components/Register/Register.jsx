import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] =useState("");
    const [showPassWord, setShowPassword] = useState(false);
const handleRegister = e =>{
    e.preventDefault();
    const name = e.target.name.value;
   const email = e.target.email.value;
   const password = e.target.password.value;
   const accepted = e.target.terms.checked;
  
   console.log(name,email,password,accepted);

    //reset error(clear)
    setRegisterError('');
    setSuccess('');

   if(password.length< 6){
    setRegisterError('Password shuld be at least 6 characters or longer');
   return;
   }else if(!/[A-Z]/.test(password)){
     setRegisterError('Your password shuld have at least one upper case characters.')
     return;
    }
    else if(!accepted){
        setRegisterError('Please accept our terms and condition')
        return;
    }

   //create user With Email and Password
   createUserWithEmailAndPassword(auth,email,password)
   .then(result =>{
    console.log(result.user)
    setSuccess('User Created Successfully.');
     
    //update Profile
    updateProfile(result.user,{
        displayName:name,
        photoURL:"https://example.com/jane-q-user/profile.jpg"
    })
    .then(() => console.log("profile updated"))
    .catch()

    // send verification email:
    sendEmailVerification(result.user)
    .then(() =>{
        alert('Please check your email and verify your account')
    })

   })
    .catch(error =>{
        console.log(error)
        setRegisterError(error.message);
    })
   }
 return (
        <div>
           <div className=" mx-auto md:w-1/2">
           <h2 className="text-3xl mb-8">Please Register</h2>
            <form onSubmit={handleRegister}>
                <input className="mb-4 w-full py-2 px-4 bg-gray-300 border" type="text" name="name" id="" placeholder="Your name" required />
                <br/>
                <input className="mb-4 w-full py-2 px-4 bg-gray-300 border" type="email" name="email" id="" placeholder="Email Address" required />
                <br/>
              <div className="border relative mb-4">
              <input className=" w-full py-2 px-4 bg-gray-300 border" 
                type={showPassWord? "text" : "password"}
                 name="password"
                  id="" placeholder="Password" required />

                <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassWord)}>
                    {showPassWord? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye> }</span>
              </div>
              <br/>
              <div className="mb-2">
                <input type="checkbox" name="terms" id="terms"/>
                <label className="ml-2" htmlFor="terms">Accept our <a href="">terms and condition</a></label>
              </div>
                <br/>
                 <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />
            </form>
           {registerError && <p className="text-3xl text-red-700">{registerError}</p>
           
           }
           {
            success && <p className="text-3xl text-green-600">{success}</p>

           }
           <p>Already have an account? Please <Link className="font-bold" to="/login">Login</Link></p>
           </div>
        </div>
    );
};

export default Register;