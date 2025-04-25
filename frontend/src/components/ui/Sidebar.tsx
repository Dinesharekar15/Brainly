import Sibaricon from './Sibaricon'
import Youtube from '../../assets/Youtube'
import Twitter from '../../assets/Twitter'
import Logo from '../../assets/Logo'
import Allicon from '../../assets/Allicon'
import { Link } from 'react-router-dom'
interface SidebarProps {
  filterCard: (str: string) => void;
  active: {
    all: boolean;
    youtube: boolean;
    twitter: boolean;
  };
}

const Sidebar = ({ filterCard, active }: SidebarProps) => {
 
  
  
  return (
    <div className='h-screen w-76 fixed absolute  bg-white border-r flex flex-col gap-2 p-4'>
        <Link to={"/dashboard"}>
        <div className='text-2xl font-bold flex gap-4 items-center cursor-pointer '>
           <Logo/> Brainly
        </div>
        </Link>
        
        <div className='ml-3 flex flex-col gap-3 mt-5'>
            <Sibaricon click={active.all} onClick={()=>filterCard("all")} icon={<Allicon/>} text='All'/>
            <Sibaricon click={active.youtube} onClick={()=>filterCard("youtube")} icon={<Youtube/>} text='YouTube'/>
            <Sibaricon click={active.twitter} onClick={()=>filterCard("twitter")} icon={<Twitter/>} text='Twitter(X)'/>
        </div>

    </div>
  )
}

export default Sidebar
