import React from 'react'
import { Routes ,Route  } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
// import { Navigate } from 'react-router-dom'
const App = () => {
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  )
}


export default App