import Crossicon from "../../assets/Crossicon";
import { Button } from "./Button";
import Input from "./Input";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../../util";
type ContentModelProps = {
  open: boolean;
  onClose: () => void;
};

const ContentModel = (prop: ContentModelProps) => {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("youtube");

  function convertYouTubeToEmbed(url: string): string {
    try {
      const videoId = new URL(url).searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch {
      return url;
    }
  }
  
  
  const addcontent = async () => {
    const title = titleref.current?.value;
    let link = linkref.current?.value;
    console.log(title,link,type)

    if (!title || !link) return;

    if (type === "youtube") {
    link = convertYouTubeToEmbed(link);
    }
    if (type === "twitter") {
      link = link.replace("x.com", "twitter.com");
    }
    
    
    
    await axios.post(BACKEND_URL + "/api/v1/content", {
      title: title,
      link: link,
      type:type
    },{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    });
    prop.onClose()

    
  };

  return (
    <div>
      {prop.open === true && (
        
          <div className="w-screen  h-screen top-0 right-0 bg-slate-500 opacity-55 fixed flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg ">
              <div className="flex flex-col gap-2">
                <span
                  className="flex justify-end mb-2 cursor-pointer"
                  onClick={prop.onClose}
                >
                  <Crossicon />
                </span>
                <div className="flex flex-col gap-3">
                  <Input ref={titleref} placeholder={"Title"} />
                  <Input ref={linkref} placeholder={"Link"} />
                  <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"value={type} onChange={(e)=>{setType(e.target.value)}} name="" id="">
                  <option value="" disabled hidden>
                    Select type
                  </option>  
                  <option value="youtube">YouTube</option>
                  <option value="twitter">Twitter</option>
                  </select>
                </div>
                <div className="mt-3 flex justify-center">
                  <Button
                    onClick={addcontent}
                    variant="primary"
                    size="lg"
                    text="Submit"
                  />
                </div>
              </div>
            </div>
          </div>
          
        
      )}
    </div>
  );
};

export default ContentModel;
