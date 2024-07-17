import React from 'react'
import { Outlet } from 'react-router-dom'

const Admin:React.FC= () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Admin
