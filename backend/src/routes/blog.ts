import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { updateBlogInput, createBlogInput } from "@govind2220000/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  try {
    if (!jwt) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET); //returns the decoded payload
    if (!payload) {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
    c.set("userId", payload.id); //we have setted the jwt generated token in our contetx c so that it can be accessed to other routes as well.
    await next();
  } catch (e) {
    return c.json(
      { message: "You are not authneticated for performing this action" },
      403
    );
  }
});

blogRouter.post("/create", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    return c.json({ message: "Please pass proper inputs" }, 411);
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: c.get("userId"),
      },
    });

    return c.json(
      { message: "Post Created Successfully", BlogId: post.id },
      201
    );
  } catch (e) {
    console.log(e);
    return c.json({ error: "Soemthing went wrong with create blog" }, 400);
  }
});

blogRouter.put("/update", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  console.log(updateBlogInput.safeParse(body));
  if (!success) {
    return c.json({ message: "Please pass proper inputs" }, 411);
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });

    return c.json(
      { message: "Post Updated Successfully", BlogId: post.id },
      201
    );
  } catch (e) {
    console.log(e);
    return c.json({ error: "Soemthing went wrong while updating blog" }, 400);
  }
});

//WE pushed bulk endpoint here as every request to /bulk was being catched by /:id route hence.
//Todo:Add a pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findMany();

    return c.json({ Blogs: post }, 201);
  } catch (e) {
    console.log(e);
    return c.json(
      { error: "Soemthing went wrong while getting all blog" },
      400
    );
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: c.req.param("id"),
      },
    });

    return c.json({ Blog: post }, 201);
  } catch (e) {
    console.log(e);
    return c.json({ error: "Soemthing went wrong while getting blog" }, 411);
  }
});
