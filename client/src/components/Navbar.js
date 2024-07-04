import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../store/action'
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handlelogout=async()=>{
   const result=await dispatch(logoutUser())
   if (result) {
    navigate('/login')
   }
  }
  return (
    <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-center space-x-4">
      {localStorage.getItem("token")?
                <button onClick={handlelogout } className='text-white'>Logout</button>:<> <Link to="/login" className="text-white hover:underline">Login</Link>
        <Link to="/register" className="text-white hover:underline">Register</Link></> }
     
    </div>
  </nav>
  )
}

export default Navbar