import Appbar from "./Appbar";
import { Blog } from "../hooks/useBlogWithId";
import { Avatar } from "../components/BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-12 w-full pt-200 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold pt-12">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 24 Jan</div>
            <div className="pt-4 ">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className=" text-slate-600">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar
                  size="big"
                  name={blog.author.name || "Anonymous"}
                ></Avatar>
              </div>

              <div>
                <div className="text-lg font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about authors ability to grab users
                  attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
