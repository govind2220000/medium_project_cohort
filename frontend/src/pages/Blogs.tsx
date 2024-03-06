import { BlogCard } from "../components/BlogCard";

import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar></Appbar>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
      </div>
    );
  }

  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonyomous"} //Anonyomous is used as in our db name is optional if its missing then Anonyomous should be displayed
              title={blog.title}
              content={blog.content}
              publishedDate={"Dec 3 2023"}
            ></BlogCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
