import React from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const [currstate, setCurrstate] = React.useState("Sign up");
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [isDataSubmitted, setIsDataSubmitted] = React.useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currstate === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw)]' />
      {/* right */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currstate}
          {isDataSubmitted && <img onClick={() => {
            setIsDataSubmitted(false);
          }} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}</h2>

        {currstate === "Sign up" && !isDataSubmitted && (

          <input type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder='Full Name' required />
        )}

        {!isDataSubmitted && (
          <>
            <input type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

          </>
        )}
        {currstate === "Sign up" && isDataSubmitted && (
          <textarea rows="4" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a short bio...' value={bio} onChange={(e) => setBio(e.target.value)} required />
        )}

        <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none rounded-md cursor-pointer'>
          {currstate === "Sign up" ? "Create Account" : "Login Now"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500 ">
          <input type="checkbox" id="terms" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className='flex flex-col gap-2'>
          {currstate === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account? <span className='font-medium text-violet-500 cursor-pointer' onClick={() => { setCurrstate("Login"); setIsDataSubmitted(false) }}>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-600'>Create account <span className='font-medium text-violet-500 cursor-pointer' onClick={() => setCurrstate("Sign up")}>Click here</span></p>
          )}
        </div>
      </form>

    </div>
  );
}

export default LoginPage
