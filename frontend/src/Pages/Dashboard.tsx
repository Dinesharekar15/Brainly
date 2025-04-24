import React, { useRef } from 'react'
import { useState } from 'react';
import { PluseIcon } from "../assets/Pluse";
import { Shareicon } from "../assets/Shareicon.tsx";
import { Button } from "../../src/components/ui/Button.tsx";
import Card from "../components/ui/Card.tsx";
import Document from "../assets/Document.tsx";
import ContentModel from "../components/ui/ContentModel.tsx";
import Sidebar from "../components/ui/Sidebar.tsx";
import { useContent } from '../hooks/useContent.tsx';
import Youtube from '../assets/Youtube.tsx';
import Twitter from '../assets/Twitter.tsx';
import axios from 'axios';
import { BACKEND_URL } from '../../util.ts';

const Dashboard = () => {
      const [open, setOpen] = useState(false);
    const content=useContent();

      
    
  return (
    <div>
      <div className="">
        <Sidebar />
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
        <div className="flex flex-wrap gap-4 justify-center ">
        {content.map(({ type, link, title }, index) => (<Card type={type} link={link} title={title}  icon={type === "youtube" ? <Youtube /> : <Twitter />}/>))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
