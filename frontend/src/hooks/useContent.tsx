import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
// console.log("URL :",BACKEND_URL)
export interface ContentType {
  _id: string;
  type: string;
  title: string;
  link:string
  // add any other properties your content has (like link, description etc.)
}
export const useContent = () => {
  const [content, setContent] = useState<ContentType[]>([]);

  

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContent(response.data.content);
      });
  }, []);

  return content;
};
