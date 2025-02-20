import LeftSideBar from '@/components/dashboard/LeftSideBar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='min-h-screen w-full'>
            <div className='flex'>
                <LeftSideBar />
                <div className='flex-1 m-2'>
                {children}
                </div>
            </div>
        </div>
    )
}

export default layout