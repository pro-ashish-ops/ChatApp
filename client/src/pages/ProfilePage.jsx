import React from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

function ProfilePage() {

  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = React.useState(null);
  const [username, setUsername] = React.useState("Martin Johnson");
  const [bio, setBio] = React.useState("Hi, I am Martin Johnson, a software engineer with a passion for building web applications. I love coding and exploring new technologies.");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center '>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1 '>
          <h3 className='text-lg'>Profile details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden/>
          <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImg && "rounded-full"}`}/>
            upload profile image
           </label>
           <input type="text" required placeholder='Your Name'  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' value={username} onChange={(e) => setUsername(e.target.value)} />
           <textarea required placeholder='Your Bio' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ' value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none rounded-full cursor-pointer p-2 text-lg'>Save</button>
        </form>
          <img src={assets.logo_icon} alt="" className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10'/>

      </div>
    </div>
  );
}

export default ProfilePage