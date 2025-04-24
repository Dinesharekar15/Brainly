import React from 'react'
import Sibaricon from './Sibaricon'
import Youtube from '../../assets/Youtube'
import Twitter from '../../assets/Twitter'
import Logo from '../../assets/Logo'

const Sidebar = () => {
  return (
    <div className='h-screen w-76 fixed absolute  bg-white border-r flex flex-col gap-2 p-4'>

        <div className='text-2xl font-bold flex gap-4 items-center cursor-pointer '>
           <Logo/> Brainly
        </div>
        <div className='ml-3 flex flex-col gap-3 mt-5'>

            <Sibaricon icon={<Youtube/>} text='YouTube'/>
            <Sibaricon icon={<Twitter/>} text='Twitter(X)'/>
        </div>

    </div>
  )
}

export default Sidebar
