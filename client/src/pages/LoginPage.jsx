import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', { fullName:fullname, email, password, bio });
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw)]' />
      {/* right */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img onClick={() => {
            setIsDataSubmitted(false);
          }} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}</h2>

        {currState === "Sign up" && !isDataSubmitted && (

          <input type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder='Full Name' required />
        )}

        {!isDataSubmitted && (
          <>
            <input type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

          </>
        )}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea rows="4" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a short bio...' value={bio} onChange={(e) => setBio(e.target.value)} required />
        )}

        <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none rounded-md cursor-pointer'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500 ">
          <input type="checkbox" id="terms" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account? <span className='font-medium text-violet-500 cursor-pointer' onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-600'>Create account <span className='font-medium text-violet-500 cursor-pointer' onClick={() => setCurrState("Sign up")}>Click here</span></p>
          )}
        </div>
      </form>

    </div>
  );
}

export default LoginPage
