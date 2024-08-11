import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { Hono } from "hono";
import { createPostInput, updatePostInput } from "@vikas_bhadu/common";


export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

//middlerware for verifying token and passing user id
blogRoute.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  console.log("jwt:", jwt);
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  try {
    const payload: any = await verify(token, c.env.JWT_SECRET);
    c.set("userId", payload.id);
    await next();
  } catch (e) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
});

// POST: blog
blogRoute.post("/", async (c) => {
  const { title, content } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = createPostInput.safeParse({
    title,
    content,
  });
  if (!success) {
    return c.json({
      error: "can't parse the post",
    });
  }
  console.log("yes");
  try {
    console.log("try");
    // const sanitizedHTML = DOMPurify.sanitize(content);
   
   
    console.log("try");
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: c.var.userId,
      },
    });
    c.status(201);
    return c.json({
      id: post.id,
    });
  } catch (e) {
    c.status(422);
    return c.json({
      error: "blog was not created!",
      msg: e,
    });
  }
});

// PUT:blog
blogRoute.put("/", async (c) => {
  const userId = c.var.userId;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content, id } = await c.req.json();

  const { success } = updatePostInput.safeParse({
    title,
    content,
  });
  if (!success) {
    return c.json({
      error: "can't parse the post",
    });
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: id,
        authorId: userId,
      },
      data: {
        title,
        content,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (e) {
    return c.json({
      error: "blog was not updated!",
      msg: e,
    });
  }
});

// GET: bulk
blogRoute.get("/bulk", async (c) => {
  console.log("bulk");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany();
  return c.json(posts);
});

blogRoute.get("/uploaded-blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.user.findUnique({
      where: {
        id: c.var.userId,
      },
      select: {
        posts: true,
      },
    });
    return c.json({
      posts: posts?.posts,
    });
  } catch (e) {
    return c.json({
      error: "while fetching blogs from db",
    });
  }
});

// GET: /:id
blogRoute.get("/:id", async (c) => {
  const userId = c.var.userId;
  const id = c.req.param("id");
  console.log("userId:", userId, "   id:", id);
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return c.json(post);
  } catch (e) {
    return c.json({
      error: "blog was not found!",
    });
  }
});
