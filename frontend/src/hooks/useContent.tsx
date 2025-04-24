import { useEffect, useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../../util";
export const useContent = () => {
  const [content, setContent] = useState([]);

  function refresh() {
    axios
      .get(BACKEND_URL + "/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContent(response.data.content);
      });
  }

  useEffect(() => {
    refresh(); // initial fetch

    const interval = setInterval(() => {
      refresh(); // periodic fetch
    }, 2 * 1000); // every 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return content;
};
