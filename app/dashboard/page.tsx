import BlogDashBoard from '@/components/dashboard/blog-dashboard'
import Navbar from '@/components/home/header/navbar'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
        <BlogDashBoard></BlogDashBoard>
    </div>
  )
}

export default Dashboard