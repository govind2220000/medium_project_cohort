import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.Blogs);
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
};

export default useBlogs;
