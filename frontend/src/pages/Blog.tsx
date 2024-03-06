import useBlogWithId from "../hooks/useBlogWithId";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import Appbar from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, blog } = useBlogWithId({ id: id || "" });
  if (loading) {
    return (
      <div>
        <Appbar></Appbar>
        <div className="flex h-screen justify-center items-center">
          <Spinner></Spinner>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <FullBlog blog={blog}></FullBlog>
    </div>
  );
};

export default Blog;
