import { useState } from 'react';
import { PluseIcon } from "../assets/Pluse";
import { Shareicon } from "../assets/Shareicon.tsx";
import { Button } from "../../src/components/ui/Button.tsx";
import Card from "../components/ui/Card.tsx";
import ContentModel from "../components/ui/ContentModel.tsx";
import Sidebar from "../components/ui/Sidebar.tsx";
import { useContent } from '../hooks/useContent.tsx';
import Youtube from '../assets/Youtube.tsx';
import Twitter from '../assets/Twitter.tsx';
import axios from 'axios';
import { BACKEND_URL } from '../../util.ts';
import { ContentType } from '../hooks/useContent.tsx';
import { useEffect } from 'react';
const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const content=useContent();
    const [filteredContent, setFilteredContent] = useState<ContentType[]>([]);

    const [active,setActiv]=useState({
      all:true,
      youtube:false,
      twitter:false
    })

    const filterCard=(type:string)=>{
     if(type=="all"){
      setFilteredContent(content)
      setActiv({
        all: true,
        youtube: false,
        twitter: false
      });
     }else{
      const result=content.filter((card)=>card.type===type)
      setFilteredContent(result)
      setActiv({
        all:false,
        youtube:type==="youtube",
        twitter:type==="twitter"

      })
     }
    }
    useEffect(() => {
      setFilteredContent(content);
    }, [content]);

      
    
  return (
    <div>
      <div className="">
        <Sidebar filterCard={filterCard} active={active}/>
      </div>

      <div className=" p-4 ml-76 bg-gray-100 min-h-screen">
        {open === true && (
          <ContentModel
            open={true}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}

        <div className="flex justify-between gap-4">
          <div className="font-bold font-sans text-2xl">
            <h1>All Notes</h1>
          </div>
          <div className="flex  gap-3">
            <Button
            onClick={async ()=>{
             const responce =await axios.post(BACKEND_URL + "/api/v1/brain/share", {
              share: true
            }, {
              headers: {
                Authorization: localStorage.getItem("token"), // if needed
                // "Content-Type": "application/json"
              }
            })
                alert(responce.data.Link)
            }}  
              starticon={<Shareicon size="lg" />}
              variant="secondary"
              size="lg"
              text="Share"
            />
            <Button
              starticon={<PluseIcon size="lg" />}
              variant="primary"
              size="lg"
              text="Add Content"
              onClick={() => {
                setOpen(true);
                
              }}
            />
          </div>
        </div>
        <div className="flex  flex-wrap gap-4 justify-start mt-6">
          {/* {content.length===0 && <div className='text-2xl font-bold'>empty brain</div>} */}
        {filteredContent.map(({ type, link, title ,_id}) => (<Card type={type} link={link} title={title} contentID={_id} icon={type === "youtube" ? <Youtube /> : <Twitter />}/>))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
